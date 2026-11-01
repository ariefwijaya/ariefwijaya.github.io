"""One project index, complete facts and progressively enhanced galleries."""
import json
import re
import unittest
from pathlib import Path

from test_site import Document, ROOT
from test_portfolio import CASES


class UnifiedWorkTests(unittest.TestCase):
    def test_all_projects_share_one_work_section(self):
        html = (ROOT / 'index.html').read_text()
        section = re.search(r'<section\b[^>]*\bid="work"[^>]*>(.*?)</section>', html, re.S)
        self.assertIsNotNone(section)
        doc = Document(section.group(1))
        links = doc.find('a', **{'class': 'work-card'})
        self.assertEqual(len(links), 19)
        self.assertEqual({x['href'] for x in links}, {f'/work/{slug}/' for slug in CASES})
        self.assertEqual(len(doc.find('a', **{'class': 'repo'})), 3)
        self.assertNotIn('Other projects', ' '.join(Document(html).text))
        self.assertNotIn('Selected work', ' '.join(Document(html).text))
        self.assertEqual(len(Document(html).find('section', id='work')), 1)
        self.assertTrue(Document(html).find('span', id='impact'))

    def test_every_project_has_context_and_working_across(self):
        for slug in CASES:
            with self.subTest(project=slug):
                html = (ROOT / f'work/{slug}/index.html').read_text()
                for label in ('My contribution', 'Context', 'Working across'):
                    fact = re.search(rf'<dt>{label}</dt><dd>(.*?)</dd>', html, re.S)
                    self.assertIsNotNone(fact, f'{slug}: missing {label}')
                    self.assertTrue(fact.group(1).strip())
                doc = Document(html)
                self.assertTrue(doc.find('a', href='/#work'))
                self.assertFalse(doc.find('a', href='/#impact'))
                self.assertIn('Project <span>/</span>', html)

    def test_gallery_links_keep_static_fallback_and_accessible_viewer(self):
        for slug in CASES:
            with self.subTest(project=slug):
                doc = Document((ROOT / f'work/{slug}/index.html').read_text())
                self.assertTrue(doc.find('script', src='/assets/project-gallery.js?v=1', defer=None))
                self.assertTrue(doc.find('dialog', id='project-viewer', **{'aria-labelledby': 'viewer-title'}))
                links = [attrs for tag, attrs in doc.nodes if tag == 'a' and 'data-gallery-image' in attrs]
                self.assertTrue(links)
                for link in links:
                    self.assertTrue(link['href'].startswith('/assets/projects/'))
                    self.assertEqual(link.get('target'), '_blank')
                    self.assertIn('noopener', link.get('rel', ''))
                    self.assertTrue(link.get('data-caption'))
                for action in ('close', 'previous', 'next', 'zoom'):
                    self.assertTrue(doc.find('button', **{'data-viewer-action': action}))
        self.assertTrue((ROOT / 'assets/project-gallery.js').is_file())

    def test_scm_has_three_separate_grounded_interface_views(self):
        data = json.loads((ROOT / 'content/projects.json').read_text())
        project = next(p for p in data['catalogue'] if p.get('slug') == 'scm-tools')
        expected = {'scm-overview', 'scm-report-detail', 'scm-telegram-delivery'}
        self.assertTrue(expected <= {x['image'] for x in project['gallery']})
        self.assertNotIn(project['cover'], expected)
        media = {Path(x['src']).stem: x for x in json.loads((ROOT / 'assets/projects/media.json').read_text())['images']}
        for stem in expected:
            with self.subTest(image=stem):
                self.assertIn(stem, media)
                self.assertEqual(media[stem]['kind'], 'presentation')
                self.assertTrue(media[stem]['basis'])
                self.assertTrue(media[stem]['sample_data'])


if __name__ == '__main__':
    unittest.main()
