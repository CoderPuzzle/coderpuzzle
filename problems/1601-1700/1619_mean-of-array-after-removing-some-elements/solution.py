from typing import List, Optional


class Solution:
    def trimMean(self, arr: List[int]) -> float:
        a = sorted(arr)
        n = len(a)
        trim = n // 20  # 5% of n, always a whole number since n is a multiple of 20
        kept = a[trim : n - trim]
        return sum(kept) / len(kept)
