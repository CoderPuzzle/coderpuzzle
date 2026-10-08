"""The web proxy is what browsers actually receive. These headers have to
live in frontend/nginx.conf: the API test client never sees them."""

import unittest
from pathlib import Path

NGINX = Path(__file__).resolve().parents[1] / "frontend" / "nginx.conf"


class WebHeaderTests(unittest.TestCase):
    def test_baseline_headers_are_set_on_the_server(self):
        text = NGINX.read_text(encoding="utf-8")
        self.assertIn('add_header X-Content-Type-Options "nosniff" always;', text)
        self.assertIn('add_header X-Frame-Options "DENY" always;', text)
        self.assertIn("frame-ancestors 'none'", text)
        self.assertIn("base-uri 'self'", text)
        self.assertIn("object-src 'none'", text)
        self.assertIn("form-action 'self'", text)
        # A location-level add_header would drop the server-level ones.
        self.assertNotIn("add_header", text.split("location", 1)[1])
