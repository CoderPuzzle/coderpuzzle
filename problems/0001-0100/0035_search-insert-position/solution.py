from typing import List


class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        # Lower bound over the half-open range [lo, hi): the first index whose
        # value is >= target. Present or absent, that index is the answer.
        lo, hi = 0, len(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if nums[mid] < target:
                # Too small: the answer sits strictly right of mid.
                lo = mid + 1
            else:
                # nums[mid] >= target keeps mid a live candidate.
                hi = mid
        return lo
