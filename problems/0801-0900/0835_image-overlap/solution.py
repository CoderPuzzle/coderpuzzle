from typing import List


class Solution:
    def largestOverlap(self, img1: List[List[int]], img2: List[List[int]]) -> int:
        # A translation slides every 1 of one image by one shared vector, so
        # a 1 at (i1, j1) in img1 sits on a 1 at (i2, j2) in img2 exactly
        # under the shift that carries (i2, j2) onto (i1, j1) — the delta
        # between the two cells. Counting over all pairs of 1-cells how often
        # each delta occurs scores every shift at once, and the largest count
        # is the largest overlap. Delta components lie in [-29, 29], so the
        # packed key dr*100 + dc is injective.
        n = len(img1)
        ones1 = [(i, j) for i in range(n) for j in range(n) if img1[i][j]]
        ones2 = [(i, j) for i in range(n) for j in range(n) if img2[i][j]]
        counts = {}
        for i1, j1 in ones1:
            for i2, j2 in ones2:
                delta = (i1 - i2) * 100 + (j1 - j2)
                counts[delta] = counts.get(delta, 0) + 1
        return max(counts.values(), default=0)
