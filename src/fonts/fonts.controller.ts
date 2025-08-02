import {
  BadRequestException,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('fonts')
export class FontsController {
  @Post('/convert')
  @UseInterceptors(FilesInterceptor('files')) // всі файли з полем 'files'
  convertFonts(@UploadedFiles() files: Express.Multer.File[]) {
    console.log('Files:', files);

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

    return { message: `Received ${files.length} files` };
  }
}
