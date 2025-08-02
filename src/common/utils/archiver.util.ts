import archiver from 'archiver';
import { PassThrough } from 'stream';
import { Injectable } from '@nestjs/common';
import { ArchiveItemType } from '../../types/archive-item.type';

@Injectable()
export class ArchiverUtil {
  async archive(items: ArchiveItemType[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const archive = archiver('zip', { zlib: { level: 9 } });
      const passthrough = new PassThrough();
      const chunks: Buffer[] = [];

      archive.on('error', reject);
      passthrough.on('error', reject);

      passthrough.on('data', (chunk) => chunks.push(chunk as Buffer));
      passthrough.on('end', () => resolve(Buffer.concat(chunks)));

      archive.pipe(passthrough);

      for (const item of items) {
        archive.append(item.buffer, { name: item.name });
      }

      archive.finalize();
    });
  }
}
