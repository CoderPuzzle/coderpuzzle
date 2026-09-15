from typing import List, Optional


class Solution:
    def checkTwoChessboards(self, coordinate1: str, coordinate2: str) -> bool:
        # A square's color follows the parity of column index plus row
        # number; character-code offsets are even, so raw codes keep it.
        p1 = (ord(coordinate1[0]) + ord(coordinate1[1])) % 2
        p2 = (ord(coordinate2[0]) + ord(coordinate2[1])) % 2
        return p1 == p2
