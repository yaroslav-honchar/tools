import { Injectable } from '@nestjs/common';
import ttf2woff from 'ttf2woff';
import ttf2woff2 from 'ttf2woff2';
import { ArchiverUtil } from '../common/utils/archiver.util';
import { ArchiveItemType } from '../types/archive-item.type';

export interface FontFormat {
  extension: string;
  mimeType: string;
}

@Injectable()
export class FontsService {
  private readonly supportedFormats: Record<string, FontFormat> = {
    woff: { extension: 'woff', mimeType: 'font/woff' },
    woff2: { extension: 'woff2', mimeType: 'font/woff2' },

    // ttf: { extension: 'ttf', mimeType: 'font/ttf' },
    // otf: { extension: 'otf', mimeType: 'font/otf' },
    // eot: { extension: 'eot', mimeType: 'application/vnd.ms-fontobject' },
    // svg: { extension: 'svg', mimeType: 'image/svg+xml' },
  };

  constructor(private readonly archiver: ArchiverUtil) {}

  async convertAndZip(
    files: Express.Multer.File[],
    targets: string[],
  ): Promise<Buffer> {
    const results: ArchiveItemType[] = [];

    for (const file of files) {
      const originName = file.originalname;

      for (const target of targets) {
        switch (target) {
          case this.supportedFormats.woff.extension:
            results.push({
              name: originName.replace(/\.ttf$/i, '.woff'),
              buffer: this.convertTtfToWoff(file),
            });
            break;
          case this.supportedFormats.woff2.extension:
            results.push({
              name: originName.replace(/\.ttf$/i, '.woff2'),
              buffer: this.convertTtfToWoff2(file),
            });
            break;
        }
      }
    }

    return this.archiver.archive(results);
  }

  convertTtfToWoff(ttfFile: Express.Multer.File): Buffer {
    try {
      const ttfBuffer = ttfFile.buffer;
      return Buffer.from(ttf2woff(ttfBuffer));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`[FontsService] Conversion failed: ${error.message}`);
      }

      throw new Error(`[FontsService] Conversion failed with error: ${error}`);
    }
  }

  convertTtfToWoff2(ttfFile: Express.Multer.File): Buffer {
    try {
      const ttfBuffer: Buffer<ArrayBufferLike> = ttfFile.buffer;
      return Buffer.from(ttf2woff2(ttfBuffer)) as Buffer<ArrayBufferLike>;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`[FontsService] Conversion failed: ${error.message}`);
      }

      throw new Error(`[FontsService] Conversion failed with error: ${error}`);
    }
  }
}
