/// <reference types="ttf2woff" />

declare function ttf2woff2(
  ttf: Uint8Array,
  options?: ttf2woff.Options,
): Buffer<ArrayBufferLike>;

export = ttf2woff2;
