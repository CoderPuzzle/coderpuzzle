from typing import List


class Solution:
    def twoSumLessThanK(self, nums: List[int], k: int) -> int:
        # Sort, then two pointers: advance lo on small sums, retreat hi on
        # large ones, tracking the largest sum below k.
        nums.sort()
        lo, hi = 0, len(nums) - 1
        best = -1
        while lo < hi:
            s = nums[lo] + nums[hi]
            if s < k:
                if s > best:
                    best = s
                lo += 1
            else:
                hi -= 1
        return best
