from typing import List, Optional


class Solution:
    def categorizeBox(self, length: int, width: int, height: int, mass: int) -> str:
        # Volume peaks at 10^5 cubed = 10^15; Python ints are exact at any
        # width. Bulky means an oversized dimension or an oversized volume;
        # Heavy means the mass crossed 100 — combine into one label.
        BULK_DIM = 10_000
        BULK_VOLUME = 10**9
        HEAVY_MASS = 100
        bulky = length >= BULK_DIM or width >= BULK_DIM or height >= BULK_DIM or length * width * height >= BULK_VOLUME
        heavy = mass >= HEAVY_MASS
        if bulky and heavy:
            return "Both"
        if bulky:
            return "Bulky"
        if heavy:
            return "Heavy"
        return "Neither"
