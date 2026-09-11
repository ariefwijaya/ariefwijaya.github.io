"""Public-output contracts: run with python3 -m unittest discover -s tests -v."""
from html.parser import HTMLParser
from pathlib import Path
import json
import unittest
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]


class Document(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.nodes = []
        self.text = []
        self.skip = 0
        self.json_text = []
        self.in_json = False
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.nodes.append((tag, attrs))
        if tag in ('script', 'style'):
            self.skip += 1
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.in_json = True

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.skip -= 1
        if tag == 'script':
            self.in_json = False

    def handle_data(self, data):
        if not self.skip:
            self.text.append(data)
        if self.in_json:
            self.json_text.append(data)

    def find(self, tag, **attrs):
        return [a for t, a in self.nodes if t == tag and all(a.get(k) == v for k, v in attrs.items())]


class PublicSiteTests(unittest.TestCase):
    def test_essential_content_is_available_to_non_javascript_readers(self):
        for lang, path in [('en', 'index.html')]:
            with self.subTest(lang=lang):
                self.assertTrue((ROOT / path).is_file(), f'{lang} must have its own static document')
                doc = Document((ROOT / path).read_text())
                visible = ' '.join(doc.text)
                self.assertTrue(doc.find('html', lang=lang))
                self.assertEqual(len(doc.find('h1')), 1)
                for value in ['Arief Wijaya', 'AnyCheck', 'Fintelite', 'Sribuu', '80%', '2017']:
                    self.assertIn(value, visible)
                self.assertTrue(doc.find('main'))
                self.assertTrue(doc.find('details'), 'case details must use native, crawlable disclosures')
                ids = [a['id'] for _, a in doc.nodes if 'id' in a]
                self.assertEqual(len(ids), len(set(ids)), 'duplicate anchor IDs')
                for _, a in doc.nodes:
                    href = a.get('href', '')
                    if href.startswith('#'):
                        self.assertIn(href[1:], ids)

    def test_complete_editorial_inventory_and_lightweight_entry(self):
        doc = Document((ROOT / 'index.html').read_text())
        self.assertEqual(len(doc.find('details', **{'class': 'job'})), 8)
        self.assertEqual(len(doc.find('details', **{'class': 'project'})), 4)
        self.assertEqual(len(doc.find('a', **{'class': 'repo'})), 4)
        self.assertEqual(' '.join(doc.text).count('80%'), 1)
        self.assertTrue(doc.find('a', href='/world/'))
        scripts = [node.get('src', '') for node in doc.find('script')]
        self.assertFalse(any('world' in src or 'three' in src for src in scripts))
        world = Document((ROOT / 'world/index.html').read_text())
        for dialog in world.find('dialog'):
            self.assertTrue(dialog.get('aria-labelledby') or dialog.get('aria-label'))
        for _, node in world.nodes:
            src = node.get('src', '').split('?')[0]
            if src.startswith('/'):
                self.assertTrue((ROOT / src.lstrip('/')).is_file(), src)
        self.assertTrue(world.find('noscript'))
        self.assertTrue(world.find('section', id='world-stories'))

    def test_locale_metadata_and_person_identity(self):
        for lang, path, url in [('en', 'index.html', 'https://ariefwijaya.github.io/')]:
            with self.subTest(lang=lang):
                self.assertTrue((ROOT / path).is_file())
                doc = Document((ROOT / path).read_text())
                self.assertTrue(doc.find('link', rel='canonical', href=url))
                self.assertFalse(doc.find('link', rel='alternate'))
                self.assertFalse(doc.find('nav', **{'class': 'languages'}))
                self.assertFalse(doc.find('meta', property='og:locale:alternate'))
                self.assertTrue(doc.find('meta', name='description'))
                self.assertTrue(doc.find('meta', property='og:image'))
                self.assertTrue(doc.json_text, 'machine-readable profile required')
                profile = json.loads(''.join(doc.json_text))
                self.assertEqual(profile['@type'], 'ProfilePage')
                self.assertEqual(profile['mainEntity']['name'], 'Arief Wijaya')
                self.assertEqual(profile['url'], url)

    def test_public_files_and_local_links_exist(self):
        for required in ['robots.txt', 'sitemap.xml', 'assets/arief-wijaya-cv.pdf', 'assets/styles.css', 'assets/site.js']:
            self.assertTrue((ROOT / required).is_file(), required)
        for path in ['index.html', 'id/index.html']:
            self.assertTrue((ROOT / path).is_file())
            doc = Document((ROOT / path).read_text())
            for tag, attrs in doc.nodes:
                for key in ['href', 'src']:
                    value = attrs.get(key, '').split('#')[0].split('?')[0]
                    if value.startswith('/') and not value.startswith('//'):
                        target = ROOT / value.lstrip('/')
                        self.assertTrue(target.exists(), value)
                if tag == 'img':
                    self.assertIn('alt', attrs, 'images need alternative text')
        legacy = Document((ROOT / 'id/index.html').read_text())
        self.assertTrue(legacy.find('meta', **{'http-equiv': 'refresh', 'content': '0; url=/'}))
        self.assertTrue(legacy.find('link', rel='canonical', href='https://ariefwijaya.github.io/'))
        self.assertTrue(legacy.find('a', href='/'))
        self.assertTrue((ROOT / 'assets/arief-wijaya-cv.pdf').read_bytes().startswith(b'%PDF-'))
        urls = ET.parse(ROOT / 'sitemap.xml').findall('{*}url/{*}loc')
        self.assertEqual({u.text for u in urls}, {'https://ariefwijaya.github.io/'})


if __name__ == '__main__':
    unittest.main()
