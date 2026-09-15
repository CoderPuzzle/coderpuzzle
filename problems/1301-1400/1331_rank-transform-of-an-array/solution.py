from typing import List


class Solution:
    def arrayRankTransform(self, arr: List[int]) -> List[int]:
        # Rank = position in the sorted distinct values, 1-based; the map is
        # then applied in input order so the output preserves positions.
        ranks = {value: rank for rank, value in enumerate(sorted(set(arr)), start=1)}
        return [ranks[value] for value in arr]
