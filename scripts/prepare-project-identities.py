#!/usr/bin/env python3
"""Export original project identities without changing their artwork.

Requires Pillow. --sources names a private JSON mapping of identity stems to
read-only source paths. Only filenames and hashes enter the public manifest.
SCM Tools uses a labelled portfolio wordmark: no original logo was recovered.
"""
import argparse
import hashlib
import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--sources', required=True, type=Path)
    args = parser.parse_args()
    sources = json.loads(args.sources.read_text())
    output = ROOT / 'assets/projects'
    manifest_path = output / 'media.json'
    manifest = json.loads(manifest_path.read_text())
    replaced = {f'/assets/projects/{stem}-logo.webp' for stem in sources}
    manifest['images'] = [x for x in manifest['images'] if x['src'] not in replaced]
    has_scm = 'scm-tools' in sources or any(
        x['src'] == '/assets/projects/scm-tools-logo.webp' for x in manifest['images'])
    fallback = [] if has_scm else [('scm-tools', None)]
    for stem, source in list(sources.items()) + fallback:
        if not stem.replace('-', '').replace('_', '').isalnum():
            raise ValueError(f'Unsafe identity stem: {stem}')
        if source:
            source = Path(source)
            with Image.open(source) as original:
                image = original.convert('RGBA')
            bounds = image.getchannel('A').getbbox()
            if bounds:
                image = image.crop(bounds)
            image.thumbnail((384, 256), Image.Resampling.LANCZOS)
            origin = 'original-project-asset'
            caption = 'Original project identity, recovered from the project assets or historical portfolio archive.'
            provenance = {'source_file': source.name, 'source_sha256': hashlib.sha256(source.read_bytes()).hexdigest()}
        else:
            image = Image.new('RGBA', (384, 160), (255, 255, 255, 0))
            draw = ImageDraw.Draw(image)
            draw.text((12, 8), 'SCM', fill='#1d201d', font=ImageFont.load_default(size=82))
            draw.text((16, 111), 'TOOLS', fill='#ae3528', font=ImageFont.load_default(size=28))
            origin = 'portfolio-wordmark'
            caption = 'Portfolio wordmark identifying SCM Tools. No separate original project logo was recovered.'
            provenance = {}
        target = output / f'{stem}-logo.webp'
        Image.frombytes('RGBA', image.size, image.tobytes()).save(target, 'WEBP', lossless=True, method=6)
        payload = target.read_bytes()
        manifest['images'].append({
            'src': f'/assets/projects/{target.name}', 'width': image.width,
            'height': image.height, 'kind': 'identity', 'identity_origin': origin,
            'caption': caption, 'bytes': len(payload),
            'sha256': hashlib.sha256(payload).hexdigest(), 'crop': None,
            'redacted': False, **provenance,
        })
    manifest_path.write_text(json.dumps(manifest, indent=2) + '\n')
    print(f'Prepared {len(sources)} original identities; preserved separately curated additions.' )


if __name__ == '__main__':
    main()
