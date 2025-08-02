import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class ConvertFontDto {
  @ApiProperty({
    description: 'Target formats for conversion',
    example: ['woff', 'woff2'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Transform(({ value }) => {
    const reqValue = value as string | string[];

    if (typeof reqValue === 'string') {
      return reqValue.split(',').map((format) => format.trim().toLowerCase());
    }
    return Array.isArray(reqValue)
      ? reqValue.map((format: string) => format.toLowerCase())
      : [];
  })
  targetFormats: string[];
}
