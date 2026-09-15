from typing import List, Optional


class Solution:
    def maxSubarraySumCircular(self, nums: List[int]) -> int:
        total = sum(nums)
        # One pass runs Kadane twice: best_max for the non-wrapping case, and
        # best_min because a wrapping subarray is total minus the omitted
        # middle chunk, which must be minimized. Seeding with nums[0] keeps
        # every candidate non-empty.
        cur_max = best_max = nums[0]
        cur_min = best_min = nums[0]
        for x in nums[1:]:
            cur_max = x + max(cur_max, 0)
            best_max = max(best_max, cur_max)
            cur_min = x + min(cur_min, 0)
            best_min = min(best_min, cur_min)
        if best_max < 0:
            # All negative: the wrap candidate degenerates to the empty
            # subarray, which is not allowed — answer is the best run.
            return best_max
        return max(best_max, total - best_min)
