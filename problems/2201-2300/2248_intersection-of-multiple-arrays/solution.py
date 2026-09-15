from typing import List


class Solution:
    def intersection(self, nums: List[List[int]]) -> List[int]:
        from collections import Counter

        counts = Counter()
        for arr in nums:
            counts.update(arr)
        return sorted(v for v, c in counts.items() if c == len(nums))
