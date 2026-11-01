#!/usr/bin/env python3
"""Import explicitly reviewed project visuals into the public WebP inventory.

The private --spec JSON names source files, neutral captions and provenance.
Original files remain read-only. No blur, masking or screenshot compositing.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re

from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--spec', required=True, type=Path)
    args = parser.parse_args()
    records = json.loads(args.spec.read_text())
    output = ROOT / 'assets/projects'
    manifest_path = output / 'media.json'
    manifest = json.loads(manifest_path.read_text())
    entries = {item['src']: item for item in manifest['images']}
    for record in records:
        stem = record['stem']
        if not re.fullmatch(r'[a-z0-9_-]+', stem):
            raise ValueError(f'Unsafe image stem: {stem}')
        source = Path(record['file'])
        source_hash = hashlib.sha256(source.read_bytes()).hexdigest()
        with Image.open(source) as original:
            image = original.convert('RGBA')
        crop = record.get('crop')
        if record.get('trim_white'):
            background = Image.new('RGBA', image.size, 'white')
            background.alpha_composite(image)
            difference = ImageChops.difference(background.convert('RGB'), Image.new('RGB', image.size, 'white'))
            mask = difference.convert('L').point(lambda value: 255 if value > 28 else 0)
            crop = mask.getbbox()
        if crop:
            image = image.crop(crop)
        identity = record['kind'] == 'identity'
        if identity:
            image.thumbnail((384, 256), Image.Resampling.LANCZOS)
        else:
            background = Image.new('RGBA', image.size, 'white')
            background.alpha_composite(image)
            image = background.convert('RGB')
        variants = [('', min(384 if identity else record.get('max_width', 1600), image.width))]
        if not identity and variants[0][1] > 800:
            variants.append(('-800', 800))
        for suffix in ('', '-800'):
            entries.pop(f'/assets/projects/{stem}{suffix}.webp', None)
        for suffix, width in variants:
            height = round(width / 1.6) if record.get('cover') else round(image.height * width / image.width)
            pixels = image.resize((width, height), Image.Resampling.LANCZOS)
            target = output / f'{stem}{suffix}.webp'
            clean = Image.frombytes(pixels.mode, pixels.size, pixels.tobytes())
            clean.save(target, 'WEBP', **({'lossless': True, 'method': 6} if identity else {'quality': 85, 'method': 6}))
            payload = target.read_bytes()
            public = {key: value for key, value in record.items() if key not in ('file', 'stem', 'cover', 'trim_white', 'crop', 'max_width')}
            public.update(src=f'/assets/projects/{target.name}', width=width, height=height,
                          bytes=len(payload), sha256=hashlib.sha256(payload).hexdigest(),
                          source_sha256=source_hash, crop=list(crop) if crop else None,
                          redacted=False, exporter='project-visuals')
            entries[public['src']] = public
    manifest['images'] = list(entries.values())
    manifest_path.write_text(json.dumps(manifest, indent=2) + '\n')
    print(f'Imported {len(records)} reviewed visuals; inventory now contains {len(entries)} WebP files.')


if __name__ == '__main__':
    main()
