from typing import List


class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        def lower_bound(limit: int) -> int:
            # Smallest index whose value is >= limit; len(nums) if none. The
            # kept half always contains that boundary, so the window halves
            # until only the boundary is left.
            lo, hi = 0, len(nums)
            while lo < hi:
                mid = (lo + hi) // 2
                if nums[mid] < limit:
                    lo = mid + 1
                else:
                    hi = mid
            return lo

        # The run of targets starts at the first index >= target...
        start = lower_bound(target)
        if start == len(nums) or nums[start] != target:
            return [-1, -1]
        # ...and ends one slot before the first index >= target + 1: the
        # upper bound of target is exactly the lower bound of target + 1.
        return [start, lower_bound(target + 1) - 1]
