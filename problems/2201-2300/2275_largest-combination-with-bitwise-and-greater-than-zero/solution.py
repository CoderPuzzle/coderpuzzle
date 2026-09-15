from typing import List, Optional


class Solution:
    def largestCombination(self, candidates: List[int]) -> int:
        counts = [0] * 24
        for value in candidates:
            for bit in range(24):
                if value >> bit & 1:
                    counts[bit] += 1
        return max(counts)
