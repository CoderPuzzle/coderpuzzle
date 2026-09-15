from typing import List, Optional


class Solution:
    def countSubarrays(self, nums: List[int], minK: int, maxK: int) -> int:
        count = 0
        # most recent positions of an out-of-range element, of minK, of maxK
        last_bad = -1
        last_min = -1
        last_max = -1
        for i, x in enumerate(nums):
            if x < minK or x > maxK:
                # a valid subarray ending anywhere later must start after i
                last_bad = i
            # tracking the last occurrence is enough: it covers earlier ones
            if x == minK:
                last_min = i
            if x == maxK:
                last_max = i
            # each right end contributes its own starts: after last_bad but at
            # or before min(last_min, last_max), so both extremes are included
            count += max(0, min(last_min, last_max) - last_bad)
        return count
