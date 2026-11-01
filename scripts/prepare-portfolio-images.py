#!/usr/bin/env python3
"""Prepare reviewed portfolio images. Source projects are read-only.

Requires Pillow. Run from the portfolio root with optional --anycheck and
--jagoan paths. Source screenshot data is mock, as confirmed by Arief.
Crops select compositions; no masks, blur or redaction overlays are applied.
"""
import argparse
import hashlib
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--anycheck', type=Path)
    parser.add_argument('--jagoan', type=Path)
    parser.add_argument('--runtime', type=Path, help='Reviewed isolated runtime capture directory')
    args = parser.parse_args()
    output = ROOT / 'assets/projects'
    output.mkdir(parents=True, exist_ok=True)
    sources = []
    originals = ROOT / 'docs/portfolio-evidence/originals'
    for filename, stem, caption in [
        ('mytimor_banner.jpg', 'mytimor-customer', 'Archived promotional image for the MyTimor customer app.'),
        ('mytimor_driver_banner.png', 'mytimor-driver', 'Archived promotional image for the MyTimor driver app.'),
        ('mytimor_merchant_banner.png', 'mytimor-merchant', 'Archived promotional image for the MyTimor merchant app.'),
        ('sribuu_banner.png', 'sribuu-promotional', 'Archived Sribuu promotional image with a mobile interface mockup.'),
    ]:
        sources.append((originals / filename, stem, 'promotional', caption, None))
    for number, stem, caption in [
        (1, 'elibrary-home', 'Archived reader-facing E-Library UNTL homepage.'),
        (2, 'elibrary-catalogue', 'Archived book catalogue. This is a reader view, not the administration interface.'),
        (6, 'elibrary-book-detail', 'Archived book-detail page with categories and reading controls.'),
    ]:
        sources.append((originals / f'elibrary_img_{number}.png', stem, 'archive', caption, None))
    sources.append((originals / 'mytimor_img_1.png', 'mytimor-home', 'archive',
                    'Archived customer-app interface with mock account data.',
                    (500, 0, 1000, 1111)))
    sources.append((originals / 'mytimor_img_1.png', 'mytimor-delivery-booking', 'archive',
                    'Customer delivery booking with sender, recipient, route and package details. Recovered from the original MyTimor interface archive; account data is mock.', (1000, 0, 1500, 1111)))
    sources.append((originals / 'mytimor_img_3.png', 'mytimor-food-discovery', 'archive',
                    'Customer restaurant menu with product choices, quantities and basket total. Recovered original interface, not a generated mockup.', (500, 0, 1000, 1111)))
    sources.append((originals / 'mytimor_img_2.png', 'mytimor-order-complete', 'archive',
                    'Completed delivery with driver rating, route details and order information. Archived customer-app screen with mock data.', (1000, 0, 1500, 1111)))
    sources.append((originals / 'ets_dishub_banner.jpg', 'ets-map', 'archive',
                    'Archived Electronic Traffic Sign interface with map markers and location controls. This is a genuine interface capture, not promotional artwork.', None))
    if args.anycheck:
        app = args.anycheck / 'anycheck-app'
        sources.extend([
            (app / '.worktrees/feat-FIN-639-mockup-fidelity/docs/pr-evidence/FIN-413/bank-statement-waiting-review.png', 'anycheck-bank-review', 'local-qa',
             'Bank-statement review from local QA: source document beside extracted header fields awaiting confirmation. This is the review interface, not the financial-analysis summary or a live bank account.', None),
            (app / 'docs/qa/FIN-662/runtime-services-hub.png', 'anycheck-services', 'local-qa',
             'AnyCheck Services Hub from local QA, cropped to focus on service selection.',
             (0, 50, 2000, 1019)),
            (app / 'docs/evidence/FIN-619/add-field-ai.png', 'anycheck-template-fields', 'local-qa',
             'Custom-template field creation from local QA, cropped to focus on the configuration dialog.',
             (624, 325, 1374, 770)),
            (app / 'docs/evidence/FIN-619/refine.png', 'anycheck-template-refine', 'local-qa',
             'Field-refinement dialog from local QA, cropped to focus on its controls.',
             (624, 351, 1374, 748)),
        ])
    if args.jagoan:
        qa = args.jagoan / 'app/qa/screens'
        sources.extend([
            (qa / 'guest__homepage.png', 'jagoan-marketplace', 'local-qa',
             'Marketplace interface from an archived local QA session; catalogue prices are sample data.',
             (0, 0, 1280, 1140)),
            (qa / 'guest__product-detail-mobile-legends.png', 'jagoan-checkout', 'local-qa',
             'Product and checkout interface from local QA. No payment was made for this portfolio.',
             (0, 90, 1280, 1615)),
            (qa / 'kreator__creator-alert-settings.png', 'jagoan-overlay-studio', 'local-qa',
             'Overlay Studio from local QA, including an example alert. Browser-source URLs and tokens are excluded.',
             (120, 90, 1160, 1140)),
        ])
    if args.runtime:
        runtime = args.runtime
        for filename, stem, caption in [
            ('anycheck-orbit-chat.png', 'anycheck-orbit-chat', 'Native Orbit chat and extraction components with a consistent synthetic invoice. The conversation is fixture state, not a live model response; the surrounding demonstration workspace is composed for this capture.'),
            ('anycheck-extraction-orbit.png', 'anycheck-extraction-review', 'Native structured-extraction component beside its synthetic source invoice, within an isolated demonstration workspace. No OCR or document processing runs.'),
            ('anycheck-owner-overview.png', 'anycheck-owner-overview', 'Native Organization Owner overview with synthetic company activity, credits, divisions and review counts. These are fixture values, not production performance metrics.'),
        ]:
            source = runtime / filename
            if source.is_file():
                sources.append((source, stem, 'runtime-demo', caption, None))
        for filename, stem, crop, caption in [
            ('anycheck-bsa-summary.png', 'anycheck-bsa-summary', (0, 0, 1720, 760), 'Native Bank Statement Analyzer with synthetic account and currency totals: five transactions, IDR 6,000,000 credit and IDR 2,500,000 debit. Fixture state, not a live bank account or measured extraction result.'),
            ('anycheck-bsa-transactions.png', 'anycheck-bsa-transactions', (0, 0, 1400, 660), 'Native transaction filters and table with five mock entries. The sample reconciles from an opening balance of IDR 10,000,000 to IDR 13,500,000. No live banking data or document processing.'),
        ]:
            source = runtime / filename
            if source.is_file():
                sources.append((source, stem, 'runtime-demo', caption, crop))
        if (runtime / 'jagoan-marketplace-runtime.png').is_file():
            sources = [item for item in sources if not item[1].startswith('jagoan-')]
            sources.extend([
                (runtime / 'jagoan-marketplace-runtime.png', 'jagoan-marketplace', 'runtime-demo',
                 'Actual Jagoan frontend rendered locally with a synthetic catalogue. Prices and accounts are demo data.',
                 (0, 0, 1440, 1200)),
                (runtime / 'jagoan-checkout-runtime.png', 'jagoan-checkout', 'runtime-demo',
                 'Checkout with fictional account details and buyer@example.test. API responses are synthetic; no payment is submitted.',
                 (0, 90, 1440, 1250)),
                (runtime / 'jagoan-order-runtime.png', 'jagoan-order', 'runtime-demo',
                 'Order-status interface with a synthetic order and a non-redeemable demo voucher. This is not a real purchase.',
                 None),
                (runtime / 'jagoan-studio-runtime.png', 'jagoan-overlay-studio', 'runtime-demo',
                 'Overlay Studio in a local synthetic-data session. Cropped before browser-source URLs; no live overlay token is published.',
                 (160, 90, 1280, 1130)),
                (runtime / 'jagoan-overlay-runtime.png', 'jagoan-overlay', 'runtime-demo',
                 'The application’s built-in OBS demo mode generates this sample alert. The donor and amount are fictional.',
                 (300, 260, 1140, 720)),
            ])
        if (runtime / 'anycheck-workflow-runtime.png').is_file():
            sources.append((runtime / 'anycheck-workflow-runtime.png', 'anycheck-workflow', 'runtime-demo',
                            'Actual AnyCheck Workflow Builder widgets in an isolated component demo with synthetic nodes and configuration. No workflow or document processing is executed.',
                            None))
        if (runtime / 'anycheck-dashboard-runtime.png').is_file():
            sources.append((runtime / 'anycheck-dashboard-runtime.png', 'anycheck-admin-dashboard', 'runtime-demo',
                            'Actual platform-administration dashboard widgets with deterministic test data. Organisation counts, credit usage and success rates are fictional, not production metrics. This is not the Organisation Owner view.',
                            None))
        if (runtime / 'gomusi-service-mobile.png').is_file():
            for view in ('service', 'wizard', 'tracking'):
                sources.append((runtime / f'gomusi-{view}-mobile.png', f'gomusi-{view}-mobile', 'runtime-demo',
                                'Native GoMUSI mobile-width interface with a fictional applicant and service flow. Synthetic API responses only; no application is submitted.', None))
        if (runtime / 'gomusi-service-runtime.png').is_file():
            sources.extend([
                (runtime / 'gomusi-service-runtime.png', 'gomusi-service-cover', 'runtime-demo',
                 'GoMUSI service overview with fictional service data. Local synthetic API responses; no real application.',
                 None),
                (runtime / 'gomusi-service-runtime.png', 'gomusi-service', 'runtime-demo',
                 'Actual GoMUSI web interface with a fictional service description and two-step review flow. Local synthetic API responses; no real application.',
                 (0, 0, 1280, 410)),
                (runtime / 'gomusi-wizard-runtime.png', 'gomusi-wizard', 'runtime-demo',
                 'Application form populated with Demo Applicant and applicant@example.test. The form is not submitted.',
                 (0, 0, 1280, 470)),
                (runtime / 'gomusi-tracking-runtime.png', 'gomusi-tracking', 'runtime-demo',
                 'Synthetic request progress: one of two steps completed, awaiting administrative review. This is not a real public-service request.',
                 (0, 0, 1280, 330)),
                (runtime / 'gomusi-admin-form-runtime.png', 'gomusi-admin-form', 'runtime-demo',
                 'GoMUSI administrative field-configuration screen with a fictional draft label. No form is saved.',
                 (0, 0, 1280, 650)),
            ])
    images = []
    for source, stem, kind, caption, crop in sources:
        if not source.is_file():
            raise SystemExit(f'Missing reviewed source for {stem}')
        source_hash = hashlib.sha256(source.read_bytes()).hexdigest()
        with Image.open(source) as original:
            rgba = original.convert('RGBA')
            background = Image.new('RGBA', rgba.size, 'white')
            background.alpha_composite(rgba)
            image = background.convert('RGB')
        if crop:
            image = image.crop(crop)
        variants = [(stem, min(1600, image.width))]
        if image.width > 800:
            variants.append((stem + '-800', 800))
        for name, width in variants:
            height = round(image.height * width / image.width)
            prepared = image.resize((width, height), Image.Resampling.LANCZOS)
            path = output / f'{name}.webp'
            prepared.save(path, 'WEBP', quality=85, method=6)
            images.append({
                'src': f'/assets/projects/{path.name}', 'width': width,
                'height': height, 'kind': kind, 'caption': caption,
                'bytes': path.stat().st_size,
                'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
                'source_sha256': source_hash, 'crop': crop,
                'redacted': False,
            })
    covers = args.runtime / 'cover-prototypes' if args.runtime else None
    if covers and covers.is_dir():
        for name, source_names in {
            'anycheck': ['anycheck-extraction-orbit.png', 'anycheck-orbit-chat.png', 'anycheck-orbit-mascot.png'],
            'jagoan': ['jagoan-marketplace-runtime.png', 'jagoan-studio-runtime.png'],
            'gomusi': ['gomusi-service-mobile.png', 'gomusi-wizard-mobile.png'],
            'mytimor': ['mytimor_img_1.png', 'mytimor_img_3.png', 'mytimor_img_2.png'],
        }.items():
            source = covers / f'{name}-cover-v2.webp'
            generated = args.runtime / 'cover-generated' / f'{name}-cover-v3.png'
            is_generated = name in ('gomusi', 'mytimor') and generated.is_file()
            if is_generated:
                source = generated
            if not source.is_file():
                continue
            if is_generated:
                provenance = json.loads((generated.parent / 'references.json').read_text())[name]
            else:
                origins = [originals / n if name == 'mytimor' else args.runtime / n for n in source_names]
                origins.append(args.runtime / 'cover-background-atlas.png')
                provenance = [{'file': p.name, 'sha256': hashlib.sha256(p.read_bytes()).hexdigest(),
                               'kind': 'generated-background' if p.name == 'cover-background-atlas.png' else ('archive' if name == 'mytimor' else 'runtime-demo')}
                              for p in origins]
            with Image.open(source) as cover:
                for width in (1600, 800):
                    filename = f'{name}-cover' + ('-800' if width == 800 else '') + '.webp'
                    path = output / filename
                    pixels = cover.convert('RGB').resize((width, round(width / 1.6)), Image.Resampling.LANCZOS)
                    Image.frombytes('RGB', pixels.size, pixels.tobytes()).save(path, 'WEBP', quality=85, method=6)
                    images.append({'src': f'/assets/projects/{filename}', 'width': width, 'height': round(width / 1.6),
                                   'kind': 'presentation',
                                   'presentation_method': 'reference-based-generation' if is_generated else 'composited-authentic-captures',
                                   'caption': ('Reference-based generated cover using original interface captures and a hardware reference. Original, unmodified screens are available in the gallery.' if is_generated else 'Portfolio cover composed from actual product captures and a generated background. Product UI is not AI-generated.'),
                                   'bytes': path.stat().st_size, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest(),
                                   'source_sha256': hashlib.sha256(source.read_bytes()).hexdigest(), 'sources': provenance,
                                   'crop': None, 'redacted': False})
    previous = output / 'media.json'
    if previous.is_file():
        generated = json.loads(previous.read_text())['images']
        prepared = {x['src'] for x in images}
        images.extend(x for x in generated if x['src'] not in prepared and (x['kind'] == 'identity' or x.get('exporter') == 'project-visuals'))
    manifest = {'images': images}
    (output / 'media.json').write_text(json.dumps(manifest, indent=2) + '\n')
    print(f'Prepared {len(images)} WebP files, {sum(i["bytes"] for i in images):,} bytes total.')


if __name__ == '__main__':
    main()
