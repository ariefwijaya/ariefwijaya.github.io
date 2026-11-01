"""Visitor-facing contracts for freelance work, media and personal identity."""
from pathlib import Path
import json
import unittest
import xml.etree.ElementTree as ET

from test_site import Document, ROOT


CASES = ('anycheck', 'jagoan-voucher', 'gomusi', 'mytimor', 'elibrary', 'sribuu',
         'sirajamusi', 'sinabung', 'siapsemeru', 'monaling', 'gardu-pln', 'ets',
         'bintango', 'musica', 'scm-tools', 'cctv-dishub', 'gerai-sdm',
         'sentuh-asetku', 'nutrizer')
PROJECTS = ('AnyCheck', 'Jagoan Voucher', 'GoMUSI', 'MyTimor', 'E-Library',
            'Sirajamusi', 'Sinabung', 'Siapsemeru', 'Monaling', 'Gardu PLN',
            'ETS', 'Sribuu', 'BintanGO', 'Musica', 'SCM Tools',
            'CCTV Dishub', 'Gerai SDM', 'Sentuh Asetku', 'Nutrizer')


class FreelancePortfolioTests(unittest.TestCase):
    def document(self, relative):
        path = ROOT / relative
        self.assertTrue(path.is_file(), f'Missing public page: {relative}')
        return Document(path.read_text())

    def test_work_links_to_project_pages_without_inline_details(self):
        html = (ROOT / 'index.html').read_text()
        work = html.split('<!-- portfolio:work:start -->')[1].split('<!-- portfolio:work:end -->')[0]
        doc = Document(work)
        self.assertFalse(doc.find('details'), 'Projects must navigate, not expand inline')
        self.assertNotIn('catalogue-gallery', work)
        links = doc.find('a', **{'class': 'work-card'})
        self.assertEqual(len(links), 19)
        for link in links:
            self.assertIn(link['href'].removeprefix('/work/').rstrip('/'), CASES)
        for slug in ('sirajamusi', 'sinabung', 'gardu-pln', 'nutrizer'):
            self.assertTrue(doc.find('a', href=f'/work/{slug}/'))

    def test_project_galleries_do_not_repeat_the_cover(self):
        for slug in CASES:
            with self.subTest(project=slug):
                doc = self.document(f'work/{slug}/index.html')
                images = [x['src'] for x in doc.find('img')
                          if x.get('src', '').startswith('/assets/projects/') and '-logo.' not in x['src']]
                self.assertTrue(images)
                self.assertEqual(len(images), len(set(images)), 'Cover must not appear twice')
                self.assertNotIn('undefined', ' '.join(doc.text))

    def test_personal_education_is_hidden_without_changing_contact_or_cv(self):
        import hashlib
        doc = self.document('index.html')
        text = ' '.join(doc.text)
        self.assertNotIn('Education', text)
        self.assertNotIn('Sriwijaya University', text)
        profile = json.loads(''.join(doc.json_text))['mainEntity']
        self.assertNotIn('alumniOf', profile)
        self.assertTrue(doc.find('a', href='https://www.linkedin.com/in/ariefwijayafirman/'))
        self.assertTrue(doc.find('a', href='mailto:ariefwijayafirman@gmail.com'))
        self.assertTrue(doc.find('button', **{'data-copy-email': 'ariefwijayafirman@gmail.com'}))
        self.assertEqual(hashlib.sha256((ROOT / 'assets/arief-wijaya-cv.pdf').read_bytes()).hexdigest(),
                         '35446f88447d3a24f7a0094a972190e2cd5bb941bfe43557ab686d54b7879a4a')

    def test_homepage_offers_project_enquiry_and_all_requested_work(self):
        doc = self.document('index.html')
        text = ' '.join(doc.text)
        self.assertTrue(any('Discuss your project' in t for t in doc.text),
                        'A client needs a direct project-enquiry CTA')
        for name in PROJECTS:
            with self.subTest(project=name):
                self.assertTrue(name in text, f'Requested project missing: {name}')
        for case in CASES:
            self.assertTrue(doc.find('a', href=f'/work/{case}/'),
                            f'No discoverable case-study link for {case}')
        self.assertTrue(doc.find('a', href='#contact'))
        self.assertTrue(doc.find('a', href='/assets/arief-wijaya-cv.pdf'))

    def test_case_studies_have_direct_static_routes_and_enquiry_links(self):
        for case in CASES:
            with self.subTest(case=case):
                doc = self.document(f'work/{case}/index.html')
                self.assertEqual(len(doc.find('h1')), 1)
                self.assertTrue(doc.find('html', lang='en'))
                self.assertTrue(doc.find('main'))
                self.assertTrue(doc.find('link', rel='canonical',
                                         href=f'https://ariefwijaya.github.io/work/{case}/'))
                self.assertTrue(doc.find('a', href='/#work'))
                self.assertTrue(doc.find('a', href='mailto:ariefwijayafirman@gmail.com'))
                ids = [a['id'] for _, a in doc.nodes if 'id' in a]
                self.assertEqual(len(ids), len(set(ids)))
                for _, attrs in doc.nodes:
                    href = attrs.get('href', '')
                    if href.startswith('#'):
                        self.assertIn(href[1:], ids, f'Broken case anchor: {href}')

    def test_obsolete_repository_is_absent_from_both_reading_paths(self):
        for relative in ('index.html', 'world/index.html', 'world/src/content.js',
                         'world/world.bundle.js'):
            with self.subTest(path=relative):
                text = (ROOT / relative).read_text().lower()
                self.assertFalse('codeigniter_aggrid' in text or 'ci3 aggrid' in text,
                                 'CI3 must be removed from main and optional-world content')

    def test_new_project_media_is_webp_sized_and_traceable(self):
        media = ROOT / 'assets/projects/media.json'
        self.assertTrue(media.is_file(), 'Public gallery requires a curated provenance manifest')
        entries = json.loads(media.read_text())['images']
        self.assertGreaterEqual(len(entries), 6)
        self.assertEqual(len({x['src'] for x in entries}), len(entries))
        for entry in entries:
            with self.subTest(image=entry['src']):
                self.assertTrue(entry['src'].startswith('/assets/projects/'))
                self.assertTrue(entry['src'].endswith('.webp'))
                path = ROOT / entry['src'].lstrip('/')
                self.assertTrue(path.is_file(), 'Gallery media must exist')
                data = path.read_bytes()
                self.assertEqual(data[:4], b'RIFF')
                self.assertEqual(data[8:12], b'WEBP')
                self.assertLess(len(data), 400_000, 'Avoid oversized full-gallery images')
                self.assertTrue(entry['caption'])
                self.assertFalse(entry['redacted'], 'Screenshot data is mock; do not censor it')
                self.assertIn(entry['kind'], ('runtime-demo', 'local-qa', 'archive', 'promotional', 'presentation', 'identity', 'public-reference'))
                self.assertGreater(entry['width'], 0)
                self.assertGreater(entry['height'], 0)
                self.assertEqual(len(entry['sha256']), 64)
        sources = {entry['src'] for entry in entries}
        for relative in ['index.html'] + [f'work/{c}/index.html' for c in CASES]:
            doc = self.document(relative)
            for image in doc.find('img'):
                src = image.get('src', '')
                if not src.startswith('/assets/projects/'):
                    continue
                self.assertIn(src, sources)
                self.assertTrue(image.get('alt'))
                self.assertTrue(image.get('width', '').isdigit())
                self.assertTrue(image.get('height', '').isdigit())
                self.assertTrue(image.get('sizes') and image.get('srcset'),
                                'Project images need responsive source selection')

    def test_public_pages_do_not_link_private_sources_or_raw_evidence(self):
        private_repos = ('sirajamusi', 'monaling', 'sinabung', 'siapsemeru',
                         'gardupln', 'ets-flutter', 'jagoan-voucher')
        for relative in ['index.html', 'world/index.html'] + [f'work/{c}/index.html' for c in CASES]:
            with self.subTest(page=relative):
                doc = self.document(relative)
                for _, node in doc.nodes:
                    for key in ('href', 'src', 'srcset'):
                        value = node.get(key, '')
                        self.assertFalse('/Users/' in value or 'portfolio-evidence/originals' in value,
                                         'Private filesystem/evidence paths must not be public links')
                        self.assertFalse(any(f'github.com/ariefwijaya/{repo}' in value
                                             for repo in private_repos),
                                         'Do not invite visitors into private source repositories')
                        if value.startswith('/') and key != 'srcset':
                            path = value.split('#')[0].split('?')[0].lstrip('/')
                            self.assertTrue((ROOT / path).exists(), f'Broken local URL: {value}')

    def test_personal_identity_is_consistent_across_all_entrypoints(self):
        required = ('assets/brand/mark.svg', 'assets/brand/wordmark.svg',
                    'assets/brand/favicon.svg', 'assets/brand/favicon.ico',
                    'assets/brand/favicon-32.png', 'assets/brand/apple-touch-icon.png')
        for relative in required:
            self.assertTrue((ROOT / relative).is_file(), f'Missing identity asset: {relative}')
        for relative in ['index.html', 'world/index.html', 'world/credits.html'] + [f'work/{c}/index.html' for c in CASES]:
            with self.subTest(page=relative):
                doc = self.document(relative)
                self.assertTrue(doc.find('link', rel='icon', type='image/svg+xml',
                                         href='/assets/brand/favicon.svg?v=1'),
                                'Every entrypoint must use the same new favicon')
                self.assertTrue(doc.find('link', rel='apple-touch-icon',
                                         href='/assets/brand/apple-touch-icon.png'))

    def test_gomusi_has_reviewed_product_views_not_only_a_text_cover(self):
        projects = json.loads((ROOT / 'content/projects.json').read_text())['cases']
        project = next(p for p in projects if p['slug'] == 'gomusi')
        self.assertTrue(project['cover'], 'GoMUSI needs a reviewed runtime cover')
        self.assertGreaterEqual(len(project['gallery']), 4)
        doc = self.document('work/gomusi/index.html')
        self.assertTrue(doc.find('img', alt=project['coverAlt']))
        self.assertTrue(doc.find('div', **{'class': 'case-lead-image'}),
                        'A separate card crop must not hide the case lead image')

    def test_remaining_project_covers_are_composed_from_original_views(self):
        data = json.loads((ROOT / 'content/projects.json').read_text())
        media = {Path(x['src']).stem: x for x in json.loads(
            (ROOT / 'assets/projects/media.json').read_text())['images']}
        slugs = {'sirajamusi', 'siapsemeru', 'monaling', 'gardu-pln', 'ets',
                 'bintango', 'musica', 'cctv-dishub', 'gerai-sdm', 'nutrizer'}
        for project in data['catalogue']:
            if project.get('slug') not in slugs:
                continue
            with self.subTest(project=project['slug']):
                cover = media[project['cover']]
                self.assertEqual(cover['kind'], 'presentation')
                self.assertEqual(cover['presentation_method'], 'reference-based-generation')
                self.assertAlmostEqual(cover['width'] / cover['height'], 1.6, places=2)
                self.assertTrue(any(x['role'] == 'ui-reference' for x in cover['sources']))
                self.assertNotIn(project['cover'], {x['image'] for x in project['gallery']})
                page = self.document(f"work/{project['slug']}/index.html")
                for item in project['gallery']:
                    self.assertTrue(any(item['image'] in x.get('src', '') for x in page.find('img')),
                                    'Keep original interface evidence on the detail page')

    def test_anycheck_additional_views_use_reviewed_dummy_data(self):
        data = json.loads((ROOT / 'content/projects.json').read_text())
        project = next(p for p in data['cases'] if p['slug'] == 'anycheck')
        gallery = {x['image'] for x in project['gallery']}
        media = {Path(x['src']).stem: x for x in json.loads(
            (ROOT / 'assets/projects/media.json').read_text())['images']}
        for stem in ('anycheck-fsa-orbit', 'anycheck-annotation-dashboard', 'anycheck-platform-dashboard'):
            with self.subTest(image=stem):
                self.assertIn(stem, gallery)
                image = media[stem]
                if stem == 'anycheck-annotation-dashboard':
                    self.assertEqual(image['kind'], 'runtime-demo')
                    self.assertEqual(image['capture_scope'], 'isolated-native-annotation-dashboard')
                    self.assertTrue(image['basis'])
                else:
                    self.assertEqual(image['kind'], 'presentation')
                    self.assertEqual(image['presentation_method'], 'reference-based-generation')
                self.assertTrue(image['sample_data'])
                self.assertTrue(any(x['role'] == 'ui-reference' for x in image['sources']))
                self.assertIn('sample', image['caption'].lower())

    def test_anycheck_showcases_its_workflow_builder(self):
        projects = json.loads((ROOT / 'content/projects.json').read_text())['cases']
        project = next(p for p in projects if p['slug'] == 'anycheck')
        self.assertIn('anycheck-workflow', [item['image'] for item in project['gallery']],
                      'A headline workflow capability needs its real interface in the gallery')
        doc = self.document('work/anycheck/index.html')
        self.assertTrue(any('anycheck-workflow' in img.get('src', '')
                            for img in doc.find('img')))

    def test_featured_covers_are_composed_separately_from_product_captures(self):
        projects = json.loads((ROOT / 'content/projects.json').read_text())['cases']
        media = {Path(x['src']).stem: x for x in json.loads(
            (ROOT / 'assets/projects/media.json').read_text())['images']}
        for project in projects[:4]:
            with self.subTest(project=project['slug']):
                cover = media[project['cover']]
                self.assertEqual(cover['kind'], 'presentation',
                                 'A featured cover needs deliberate composition, not an automatic UI crop')
                self.assertAlmostEqual(cover['width'] / cover['height'], 1.6, places=2)
                self.assertGreaterEqual(len(cover['sources']), 2)

    def test_anycheck_highlights_orbit_and_document_review(self):
        project = next(p for p in json.loads((ROOT / 'content/projects.json').read_text())['cases']
                       if p['slug'] == 'anycheck')
        images = {x['image'] for x in project['gallery']}
        self.assertIn('anycheck-orbit-chat', images)
        self.assertIn('anycheck-extraction-review', images)
        self.assertIn('anycheck-bank-review', images)
        self.assertIn('anycheck-bsa-summary', images)
        self.assertIn('anycheck-bsa-transactions', images)
        doc = self.document('work/anycheck/index.html')
        self.assertTrue(any('orbit-chat' in x.get('src', '') for x in doc.find('img')))

    def test_useful_historic_journeys_are_shown_not_only_brand_banners(self):
        data = json.loads((ROOT / 'content/projects.json').read_text())
        mytimor = next(p for p in data['cases'] if p['slug'] == 'mytimor')
        self.assertTrue({'mytimor-delivery-booking', 'mytimor-food-discovery', 'mytimor-order-complete'}
                        <= {x['image'] for x in mytimor['gallery']})
        ets = next(p for p in data['catalogue'] if p['name'].startswith('ETS'))
        self.assertTrue(ets.get('cover'), 'The genuine ETS map capture must not stay text-only')

    def test_mobile_covers_use_reference_generation_and_keep_original_screens(self):
        data = json.loads((ROOT / 'content/projects.json').read_text())
        media = {Path(x['src']).stem: x for x in json.loads(
            (ROOT / 'assets/projects/media.json').read_text())['images']}
        for slug in ('gomusi', 'mytimor'):
            project = next(x for x in data['cases'] if x['slug'] == slug)
            with self.subTest(project=slug):
                cover = media[project['cover']]
                self.assertEqual(cover.get('presentation_method'), 'reference-based-generation')
                self.assertTrue(any(x.get('role') == 'ui-reference' for x in cover['sources']))
                self.assertTrue(all(media[item['image']]['kind'] != 'presentation'
                                    for item in project['gallery']),
                                'Generated covers must not replace original interface evidence')

    def test_every_project_has_a_visible_traceable_identity(self):
        data = json.loads((ROOT / 'content/projects.json').read_text())
        media = {Path(x['src']).stem: x for x in json.loads(
            (ROOT / 'assets/projects/media.json').read_text())['images']}
        home = self.document('index.html')
        for project in data['cases'] + data['catalogue']:
            with self.subTest(project=project['name']):
                self.assertTrue(project.get('logo'), 'Every project needs its own identifiable logo or honest wordmark')
                identity = media[project['logo']]
                self.assertEqual(identity['kind'], 'identity')
                self.assertTrue(identity.get('identity_origin'))
                self.assertTrue(any(project['logo'] in x.get('src', '') for x in home.find('img')))
        for project in data['cases']:
            doc = self.document(f"work/{project['slug']}/index.html")
            self.assertTrue(any(project['logo'] in x.get('src', '') for x in doc.find('img')))

    def test_unified_work_keeps_priority_projects_and_the_complete_inventory(self):
        html = (ROOT / 'index.html').read_text()
        work = html.split('<!-- portfolio:work:start -->')[1].split('<!-- portfolio:work:end -->')[0]
        doc = Document(work)
        links = doc.find('a', **{'class': 'work-card'})
        self.assertEqual(len(links), 19)
        self.assertEqual([link['href'] for link in links[:4]],
                         ['/work/anycheck/', '/work/jagoan-voucher/', '/work/sribuu/', '/work/mytimor/'])
        self.assertTrue(doc.find('a', href='/work/gomusi/'))
        self.document('work/sribuu/index.html')
        self.assertNotIn('class="impact-grid"', work)
        self.assertNotIn('class="supporting-work"', work)

    def test_supporting_projects_have_honestly_classified_visuals(self):
        data = json.loads((ROOT / 'content/projects.json').read_text())
        media = {Path(x['src']).stem: x for x in json.loads(
            (ROOT / 'assets/projects/media.json').read_text())['images']}
        for project in data['catalogue']:
            with self.subTest(project=project['name']):
                self.assertTrue(project.get('gallery') or project.get('case'), 'Provide a visual or a full case study')
                for item in project.get('gallery', []):
                    image = media[item['image']]
                    if image.get('presentation_method') == 'source-informed-generation':
                        self.assertTrue(image.get('basis'))

    def test_published_app_views_use_supplied_listings_and_neutral_labels(self):
        data = json.loads((ROOT / 'content/projects.json').read_text())
        media = {Path(x['src']).stem: x for x in json.loads(
            (ROOT / 'assets/projects/media.json').read_text())['images']}
        names = ('MyTimor', 'E-Library UNTL', 'Musica', 'BintanGO', 'Nutrizer',
                 'ETS · Electronic Traffic Sign', 'Gerai SDM', 'Siapsemeru',
                 'Sirajamusi', 'CCTV Dishub', 'Monaling')
        for name in names:
            project = next(p for p in data['cases'] + data['catalogue'] if p['name'] == name)
            with self.subTest(project=name):
                published = [media[x['image']] for x in project.get('gallery', [])
                             if media[x['image']].get('reference_type') == 'public-listing']
                self.assertTrue(published, 'Use actual reviewed published app screens where available')
                for image in published:
                    self.assertEqual(image['kind'], 'public-reference')
                    self.assertTrue(image['source_url'].startswith('https://apkpure.com/'))
                    self.assertTrue(image['source_image_url'].startswith('https://image.winudf.com/'))
        mytimor = next(p for p in data['cases'] if p['slug'] == 'mytimor')
        for role in ('driver', 'merchant'):
            self.assertTrue(any(role in x['image'] and 'published' in x['image']
                                for x in mytimor['gallery']))
        pages = '\n'.join((ROOT / f'work/{case}/index.html').read_text() for case in CASES)
        self.assertIn('Published app view', pages)
        self.assertNotIn('promotional images, not captures of those roles',
                         (ROOT / 'work/mytimor/index.html').read_text())

    def test_capture_inventory_marks_obsolete_claims_as_superseded(self):
        inventory = (ROOT / 'docs/portfolio-evidence/screenshot-inventory.md').read_text()
        self.assertIn('Superseded', inventory[:600])
        self.assertIn('[current capture status](capture-status.md)', inventory[:600])

    def test_case_routes_are_in_the_sitemap(self):
        urls = {node.text for node in ET.parse(ROOT / 'sitemap.xml').findall('{*}url/{*}loc')}
        expected = {'https://ariefwijaya.github.io/'} | {
            f'https://ariefwijaya.github.io/work/{case}/' for case in CASES}
        self.assertEqual(urls, expected)


if __name__ == '__main__':
    unittest.main()
