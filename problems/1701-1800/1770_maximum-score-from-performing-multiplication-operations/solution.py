from typing import List, Optional


class Solution:
    def maximumScore(self, nums: List[int], multipliers: List[int]) -> int:
        m = len(multipliers)
        n = len(nums)
        NEG_INF = float("-inf")
        # Base: after all m operations no score remains — stage m is all 0.
        prev = [0] * (m + 1)
        # State (i, l) is complete: l taken from the left forces r = i - l
        # from the right, so the remaining ends are nums[l] and
        # nums[n - 1 - r] and nothing else matters.
        for i in range(m - 1, -1, -1):
            # Slots with l > i are unreachable at this stage; -inf keeps
            # them from ever winning a max.
            cur = [NEG_INF] * (m + 1)
            for l in range(0, i + 1):
                r = i - l
                # prev holds stage i + 1: taking the left moves to (i+1, l+1),
                # taking the right to (i+1, l).
                take_left = prev[l + 1] + multipliers[i] * nums[l]
                take_right = prev[l] + multipliers[i] * nums[n - 1 - r]
                cur[l] = take_left if take_left >= take_right else take_right
            prev = cur
        # State (0, 0): no operations used, nothing taken from the left.
        return prev[0]
