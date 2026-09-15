from typing import List


class Solution:
    def minimumDifference(self, nums: List[int], k: int) -> int:
        # Sort so the k chosen students form a contiguous window; the span
        # of that window is its highest minus lowest score.
        nums.sort()
        best = nums[k - 1] - nums[0]
        for i in range(k, len(nums)):
            gap = nums[i] - nums[i - k + 1]
            if gap < best:
                best = gap
        return best
