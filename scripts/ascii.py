#!/usr/bin/env python3
"""Render a screenshot as coarse ASCII art, bucketing each cell to the
CoderPuzzle palette so the layout can be read without vision. Local-only
(the shots it reads are gitignored).

    python3 scripts/ascii.py .localonly/shots/landing-dark.png [cols]
"""
import sys

from PIL import Image

PALETTE = {
    ".": (0x0b, 0x0d, 0x0f),  # canvas carbon
    ",": (0x15, 0x19, 0x1c),  # surface
    ":": (0x1b, 0x20, 0x24),  # surface-raised
    ";": (0x24, 0x2a, 0x2e),  # soft / selects
    "-": (0x2b, 0x32, 0x37),  # line
    "=": (0x65, 0x71, 0x7b),  # quiet
    "+": (0x92, 0x9c, 0xa5),  # muted
    "#": (0xf2, 0xf4, 0xf5),  # ink
    "A": (0xe1, 0xa8, 0x4b),  # amber / brass
    "a": (0xf2, 0xbd, 0x61),  # brass highlight
    "c": (0x62, 0xb8, 0xca),  # cyan
    "g": (0x43, 0xc5, 0x82),  # green / AC
    "r": (0xed, 0x6a, 0x67),  # red / WA
    "o": (0xe6, 0x95, 0x52),  # orange / TLE
    "G": (0x28, 0x2f, 0x34),  # editor gutter-ish
    "E": (0x15, 0x19, 0x1c),  # editor bg (blended surface)
    "w": (0xfe, 0xff, 0xff),  # near white
}


def nearest(chars):
    def match(px):
        best, best_d = "?", 1e9
        for ch, (r, g, b) in PALETTE.items():
            d = (px[0] - r) ** 2 + (px[1] - g) ** 2 + (px[2] - b) ** 2
            if d < best_d:
                best, best_d = ch, d
        return best
    return match


def main():
    path = sys.argv[1]
    cols = int(sys.argv[2]) if len(sys.argv) > 2 else 140
    img = Image.open(path).convert("RGB")
    w, h = img.size
    rows = max(1, round(h / w * cols * 0.5))
    small = img.resize((cols, rows))
    match = nearest(PALETTE)
    px = small.load()
    for y in range(rows):
        print("".join(match(px[x, y]) for x in range(cols)))


if __name__ == "__main__":
    main()
