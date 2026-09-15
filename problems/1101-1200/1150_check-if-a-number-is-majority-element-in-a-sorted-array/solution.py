from bisect import bisect_left, bisect_right
from typing import List


class Solution:
    def isMajorityElement(self, nums: List[int], target: int) -> bool:
        # Sorted array: the target's occurrences form one contiguous run,
        # whose length is the distance between the two search boundaries.
        low = bisect_left(nums, target)
        high = bisect_right(nums, target)
        return 2 * (high - low) > len(nums)
