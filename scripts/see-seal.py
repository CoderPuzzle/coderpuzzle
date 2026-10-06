#!/usr/bin/env python3
"""Crop the verdict seal from the workspace screenshot and render it as a
fine ASCII map so its shape (ring, fill, monogram) can be inspected."""
import sys

from PIL import Image

# Nearest-palette for the seal region only.
PALETTE = {
    "A": (0xe1, 0xa8, 0x4b),  # amber ring
    "a": (0xf2, 0xbd, 0x61),  # brass highlight
    "g": (0x43, 0xc5, 0x82),  # green monogram
    "#": (0xf2, 0xf4, 0xf5),  # near-white
    "+": (0x92, 0x9c, 0xa5),  # muted
    "=": (0x65, 0x71, 0x7b),  # quiet
    "-": (0x2b, 0x32, 0x37),  # line
    ":": (0x26, 0x20, 0x10),  # fill hi
    ",": (0x1c, 0x18, 0x0f),  # fill
    ".": (0x10, 0x0d, 0x07),  # fill lo
}


def main():
    path = sys.argv[1]
    x, y, w, h = (int(v) for v in sys.argv[2:6])
    scale = int(sys.argv[6]) if len(sys.argv) > 6 else 2
    img = Image.open(path).convert("RGB").crop((x, y, x + w, y + h))
    img = img.resize((w * scale, h * scale), Image.NEAREST)
    px = img.load()

    def match(p):
        best, best_d = "?", 1e9
        for ch, (r, g, b) in PALETTE.items():
            d = (p[0] - r) ** 2 + (p[1] - g) ** 2 + (p[2] - b) ** 2
            if d < best_d:
                best, best_d = ch, d
        return best

    for yy in range(img.height):
        print("".join(match(px[xx, yy]) for xx in range(img.width)))


if __name__ == "__main__":
    main()
