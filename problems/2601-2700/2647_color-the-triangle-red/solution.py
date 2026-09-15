from typing import List


class Solution:
    def colorRed(self, n: int) -> List[List[int]]:
        # Period-4 construction, four rows at a time going bottom up. The
        # leftover tip rows (tipSize = n % 4) are seeded at the top, then
        # everything below tiles into full bands of four rows: each band's
        # top row takes the leftmost triangle, its second row takes every
        # odd column except the first, its third row a single column-2
        # triangle, and its bottom row every odd column. Under the >= 2
        # red-neighbors rule each band floods by itself, so the whole
        # triangle ends red using the minimum number of initial seeds.
        ans: List[List[int]] = []
        tip_size = n % 4
        if tip_size >= 1:
            ans.append([1, 1])
        for r in range(2, tip_size + 1):
            ans.append([r, 1])
            ans.append([r, 2 * r - 1])
        i = tip_size + 1
        while i < n:
            # Top row of this band.
            ans.append([i, 1])
            # Second row: odd columns 3 .. 2i+1.
            for j in range(1, i + 1):
                ans.append([i + 1, 2 * j + 1])
            # Third row: single down-pointing triangle.
            ans.append([i + 2, 2])
            # Bottom row: every odd column.
            for j in range(i + 3):
                ans.append([i + 3, 2 * j + 1])
            i += 4
        return ans
