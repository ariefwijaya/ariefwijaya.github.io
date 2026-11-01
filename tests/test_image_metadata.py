"""Image metadata is removed without re-encoding screenshot pixels."""
import importlib.util
from pathlib import Path
import struct
import unittest
import zlib

ROOT = Path(__file__).resolve().parents[1]


def png_chunk(kind, payload):
    return (struct.pack('>I', len(payload)) + kind + payload
            + struct.pack('>I', zlib.crc32(kind + payload) & 0xffffffff))


def webp_chunk(kind, payload):
    return kind + struct.pack('<I', len(payload)) + payload + b'\0' * (len(payload) % 2)


class MetadataRemovalTests(unittest.TestCase):
    def cleaner(self):
        path = ROOT / 'scripts/strip-image-metadata.py'
        self.assertTrue(path.is_file(), 'Implement a pixel-preserving metadata cleaner')
        spec = importlib.util.spec_from_file_location('metadata_cleaner', path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        return module

    def test_png_keeps_compressed_pixels_but_removes_text_exif_and_content_credentials(self):
        header = png_chunk(b'IHDR', struct.pack('>IIBBBBB', 1, 1, 8, 2, 0, 0, 0))
        pixels = png_chunk(b'IDAT', zlib.compress(b'\0\x20\x40\x60'))
        end = png_chunk(b'IEND', b'')
        source = (b'\x89PNG\r\n\x1a\n' + header
                  + png_chunk(b'tEXt', b'Software\0AI generator')
                  + png_chunk(b'eXIf', b'example EXIF')
                  + png_chunk(b'caBX', b'example content credentials') + pixels + end)
        result = self.cleaner().strip_png(source)
        self.assertEqual(result, b'\x89PNG\r\n\x1a\n' + header + pixels + end)

    def test_webp_keeps_image_payload_and_clears_metadata_flags(self):
        extended = bytes([0x3c]) + b'\0' * 9
        image = webp_chunk(b'VP8L', b'pixel payload')
        body = (b'WEBP' + webp_chunk(b'VP8X', extended)
                + webp_chunk(b'ICCP', b'profile') + image
                + webp_chunk(b'EXIF', b'generator')
                + webp_chunk(b'XMP ', b'author info'))
        source = b'RIFF' + struct.pack('<I', len(body)) + body
        result = self.cleaner().strip_webp(source)
        expected = b'WEBP' + webp_chunk(b'VP8X', bytes([0x10]) + b'\0' * 9) + image
        self.assertEqual(result, b'RIFF' + struct.pack('<I', len(expected)) + expected)

    def test_jpeg_keeps_coded_scan_but_removes_app_and_comment_segments(self):
        segment = lambda marker, data: b'\xff' + bytes([marker]) + struct.pack('>H', len(data) + 2) + data
        quant = segment(0xdb, b'quantization')
        scan = segment(0xda, b'scan header') + b'coded\xff\0pixels\xff\xd9'
        source = (b'\xff\xd8' + segment(0xe0, b'JFIF\0density')
                  + segment(0xe1, b'Exif\0creator') + segment(0xeb, b'c2pa')
                  + segment(0xfe, b'generator comment') + quant + scan)
        self.assertEqual(self.cleaner().strip_jpeg(source), b'\xff\xd8' + quant + scan)


if __name__ == '__main__':
    unittest.main()
