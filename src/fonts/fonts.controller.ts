import {
  BadRequestException,
  Body,
  Controller,
  Header,
  Post,
  StreamableFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConvertFontDto } from './dto/convert-fonts.dto';
import { FontsService } from './fonts.service';
import { SUPPORTED_OUTPU_FONT_FORMATS } from './fonts.constant';

@ApiTags('Fonts')
@Controller('fonts')
export class FontsController {
  constructor(private readonly fontService: FontsService) {}

  @Post('/convert')
  @ApiOperation({ summary: 'Convert TTF fonts files to different formats' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
          maxItems: 10,
          description: 'Font files to convert (max 10 files)',
        },
        targetFormats: {
          type: 'array',
          items: { type: 'string' },
          example: ['woff', 'woff2'],
          description: 'Target formats for conversion',
          enum: SUPPORTED_OUTPU_FONT_FORMATS,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'ZIP архів зі шрифтами',
    content: {
      'application/zip': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB per file
      },
      fileFilter: (_, file, callback) => {
        const allowedMimeTypes = ['font/ttf', 'application/x-font-ttf'];

        const isValidMimeType = allowedMimeTypes.includes(file.mimetype);
        const isValidExtension = file.originalname.match(/\.(ttf)$/i);

        if (isValidMimeType || isValidExtension) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException(
              `Invalid file type: ${file.originalname}. Only TTF files are allowed.`,
            ),
            false,
          );
        }
      },
    }),
  )
  @Header('Content-Type', 'application/zip')
  @Header(
    'Content-Disposition',
    `attachment; filename="fonts_${Date.now()}.zip"`,
  )
  async convertFonts(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() convertFontDto: ConvertFontDto,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    try {
      const zipBuffer = await this.fontService.convertAndZip(
        files,
        convertFontDto.targetFormats,
      );

      return new StreamableFile(zipBuffer);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(
          `Font conversion failed: ${error.message}`,
        );
      }

      throw new BadRequestException(
        `Font conversion failed with unknown error`,
      );
    }
  }
}
