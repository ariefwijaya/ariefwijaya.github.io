"""Regeneration must not discard separately curated project identities."""
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]


class IdentityExportTests(unittest.TestCase):
    def test_original_asset_refresh_preserves_generated_identities(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'scripts').mkdir()
            script = root / 'scripts/prepare-project-identities.py'
            script.write_bytes((ROOT / 'scripts/prepare-project-identities.py').read_bytes())
            output = root / 'assets/projects'
            output.mkdir(parents=True)
            records = []
            originals = {}
            for stem in ('scm-tools', 'mina-finansial', 'game-center'):
                file = output / f'{stem}-logo.webp'
                Image.new('RGBA', (12, 12), '#ae3528').save(file, 'WEBP', lossless=True)
                originals[file.name] = file.read_bytes()
                records.append({'src': f'/assets/projects/{file.name}', 'kind': 'identity',
                                'identity_origin': 'generated-portfolio-identity'})
            (output / 'media.json').write_text(json.dumps({'images': records}))
            source = root / 'original.png'
            Image.new('RGBA', (16, 16), '#0057a8').save(source)
            mapping = root / 'sources.json'
            mapping.write_text(json.dumps({'sample-project': str(source)}))
            result = subprocess.run([sys.executable, '-I', str(script), '--sources', str(mapping)],
                                    capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stderr)
            exported = json.loads((output / 'media.json').read_text())['images']
            self.assertEqual(len(exported), 4)
            for name, payload in originals.items():
                self.assertEqual((output / name).read_bytes(), payload)
                self.assertTrue(any(x['src'].endswith('/' + name) for x in exported))


if __name__ == '__main__':
    unittest.main()
