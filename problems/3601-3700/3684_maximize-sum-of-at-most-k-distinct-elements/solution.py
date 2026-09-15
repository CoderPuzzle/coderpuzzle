from typing import List, Optional


class Solution:
    def maxKDistinct(self, nums: List[int], k: int) -> List[int]:
        # A duplicate can never be picked twice and never beats an unused
        # value, so only the set of distinct values matters.
        distinct = set(nums)
        # Descending order lines the largest values up first; the first k of
        # them are the unique optimum, truncated when fewer than k exist.
        return sorted(distinct, reverse=True)[:k]
