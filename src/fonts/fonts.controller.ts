import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { ConvertFontDto } from './dto/convert-fonts.dto';

@Controller('fonts')
export class FontsController {
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
        },
      },
    },
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
  convertFonts(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() convertFontDto: ConvertFontDto,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    files.forEach((file, index) => {
      console.log(`File ${index}:`, {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      });
    });

    console.log('convertFontDto: ', convertFontDto);

    return { message: `Received ${files.length} files` };
  }
}
