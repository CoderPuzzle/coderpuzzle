from typing import List


class Solution:
    def minDominoRotations(self, tops: List[int], bottoms: List[int]) -> int:
        n = len(tops)

        # For candidate value x, one pass decides whether every domino can
        # show x on some face, and if so, the cheaper of "rotate x onto
        # every top" vs "rotate x onto every bottom".
        def check(x: int) -> int:
            rotations_top = 0
            rotations_bottom = 0
            for i in range(n):
                if tops[i] != x and bottoms[i] != x:
                    return -1
                elif tops[i] != x:
                    rotations_top += 1
                elif bottoms[i] != x:
                    rotations_bottom += 1
            return min(rotations_top, rotations_bottom)

        # Only tops[0] or bottoms[0] can ever fill a whole row, since the
        # very first domino must already carry the value on one face.
        result = check(tops[0])
        if result != -1 or tops[0] == bottoms[0]:
            return result
        return check(bottoms[0])
