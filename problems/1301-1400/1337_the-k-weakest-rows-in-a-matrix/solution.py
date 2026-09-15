from typing import List


class Solution:
    def kWeakestRows(self, mat: List[List[int]], k: int) -> List[int]:
        # Weakness order == lexicographic order of (soldiers, index); rows
        # are all 1's then 0's, so the sum is the first-civilian index too.
        ranked = sorted((sum(row), index) for index, row in enumerate(mat))
        return [index for _, index in ranked[:k]]
