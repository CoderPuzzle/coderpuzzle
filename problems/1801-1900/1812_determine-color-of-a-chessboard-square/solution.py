from typing import List, Optional


class Solution:
    def squareIsWhite(self, coordinates: str) -> bool:
        # A square is white exactly when its file and rank have opposite
        # parities: a1 is black (1 + 1 is even), and every step along a
        # file or a rank flips the color, so the color is the parity of
        # file + rank -- odd sums are white, even sums are black. Both
        # characters are read straight from the coordinate, and nothing
        # exceeds 16, so every language runs exact small integers.
        file = ord(coordinates[0]) - ord("a") + 1
        rank = int(coordinates[1])
        return (file + rank) % 2 == 1
