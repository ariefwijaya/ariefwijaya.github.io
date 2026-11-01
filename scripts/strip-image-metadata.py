#!/usr/bin/env python3
"""Remove embedded image metadata while preserving coded pixels and animation.

Use explicit generated/curated file paths or directories. Original application
repositories and uncurated source archives are not cleanup targets. --check
reports files that still contain removable metadata without changing them.
"""
import argparse
from pathlib import Path
import struct


PNG_SIGNATURE = b'\x89PNG\r\n\x1a\n'


def strip_png(data):
    if not data.startswith(PNG_SIGNATURE):
        raise ValueError('Invalid PNG signature')
    output = bytearray(PNG_SIGNATURE)
    offset = len(PNG_SIGNATURE)
    while offset < len(data):
        if offset + 12 > len(data):
            raise ValueError('Truncated PNG chunk')
        length = struct.unpack_from('>I', data, offset)[0]
        kind = data[offset + 4:offset + 8]
        end = offset + 12 + length
        if end > len(data):
            raise ValueError('Truncated PNG payload')
        # Keep critical image chunks, transparency and APNG frame control.
        if not (kind[0] & 0x20) or kind in (b'tRNS', b'acTL', b'fcTL', b'fdAT'):
            output.extend(data[offset:end])
        offset = end
        if kind == b'IEND':
            return bytes(output)
    raise ValueError('Missing PNG end chunk')


def strip_webp(data):
    if len(data) < 12 or data[:4] != b'RIFF' or data[8:12] != b'WEBP':
        raise ValueError('Invalid WebP signature')
    output = bytearray(b'WEBP')
    offset = 12
    limit = struct.unpack_from('<I', data, 4)[0] + 8
    if limit > len(data):
        raise ValueError('Truncated WebP container')
    while offset < limit:
        if offset + 8 > limit:
            raise ValueError('Truncated WebP chunk')
        kind = data[offset:offset + 4]
        length = struct.unpack_from('<I', data, offset + 4)[0]
        end = offset + 8 + length + length % 2
        if end > limit:
            raise ValueError('Truncated WebP payload')
        if kind in (b'VP8 ', b'VP8L', b'VP8X', b'ALPH', b'ANIM', b'ANMF'):
            chunk = bytearray(data[offset:end])
            if kind == b'VP8X' and length:
                chunk[8] &= ~0x2c  # Clear ICC, EXIF and XMP flags, keep alpha/animation.
            output.extend(chunk)
        offset = end
    return b'RIFF' + struct.pack('<I', len(output)) + bytes(output)


def strip_jpeg(data):
    if not data.startswith(b'\xff\xd8'):
        raise ValueError('Invalid JPEG signature')
    output = bytearray(data[:2])
    offset = 2
    while offset < len(data):
        start = offset
        if data[offset] != 0xff:
            raise ValueError('Invalid JPEG marker')
        while offset < len(data) and data[offset] == 0xff:
            offset += 1
        if offset >= len(data):
            raise ValueError('Truncated JPEG marker')
        marker = data[offset]
        offset += 1
        if marker in (0xda, 0xd9):
            output.extend(data[start:])  # Keep compressed scan bytes untouched.
            return bytes(output)
        if marker == 0x01 or 0xd0 <= marker <= 0xd7:
            output.extend(data[start:offset])
            continue
        if offset + 2 > len(data):
            raise ValueError('Truncated JPEG segment')
        length = struct.unpack_from('>H', data, offset)[0]
        if length < 2 or offset + length > len(data):
            raise ValueError('Invalid JPEG segment size')
        if not (0xe0 <= marker <= 0xef or marker == 0xfe):
            output.extend(data[start:offset + length])
        offset += length
    raise ValueError('Missing JPEG scan')


def cleaned_bytes(data):
    if data.startswith(PNG_SIGNATURE):
        return strip_png(data)
    if data.startswith(b'RIFF') and data[8:12] == b'WEBP':
        return strip_webp(data)
    if data.startswith(b'\xff\xd8'):
        return strip_jpeg(data)
    raise ValueError('Unsupported image format')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('paths', nargs='+', type=Path)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    files = set()
    for path in args.paths:
        files.update(p for p in path.rglob('*') if p.suffix.lower() in ('.png', '.jpg', '.jpeg', '.webp')) if path.is_dir() else files.add(path)
    changed = 0
    for path in sorted(files):
        original = path.read_bytes()
        result = cleaned_bytes(original)
        if result == original:
            continue
        changed += 1
        print(('Metadata remains: ' if args.check else 'Cleaned: ') + str(path))
        if not args.check:
            path.write_bytes(result)
    print(f'{len(files)} images checked; {changed} ' + ('need cleanup.' if args.check else 'metadata containers cleaned.'))
    raise SystemExit(1 if args.check and changed else 0)


if __name__ == '__main__':
    main()
