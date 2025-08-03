import { SUPPORTED_OUTPU_FONT_FORMATS } from "../fonts.constant";

import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsIn, IsString } from "class-validator";

export class ConvertFontDto {
  @ApiProperty({
    description: "Target formats for conversion",
    example: ["woff", "woff2"],
    enum: SUPPORTED_OUTPU_FONT_FORMATS,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsIn(SUPPORTED_OUTPU_FONT_FORMATS, {
    each: true,
    message: `Each format must be either: ${SUPPORTED_OUTPU_FONT_FORMATS.join(", ")}`,
  })
  @Transform(({ value }) => {
    const reqValue = value as string | string[];

    if (typeof reqValue === "string") {
      return reqValue.split(",").map((format) => format.trim().toLowerCase());
    }
    return Array.isArray(reqValue)
      ? reqValue.map((format: string) => format.toLowerCase())
      : [];
  })
    targetFormats: string[];
}
