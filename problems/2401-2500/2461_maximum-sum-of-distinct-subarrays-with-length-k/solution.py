from typing import List, Optional


class Solution:
    def maximumSubarraySum(self, nums: List[int], k: int) -> int:
        # counts maps value -> frequency in the current window; zero-count
        # keys are deleted so len(counts) is the window's distinct count.
        counts = {}
        window_sum = 0
        best = 0
        for i, value in enumerate(nums):
            counts[value] = counts.get(value, 0) + 1
            window_sum += value
            # Retire nums[i-k] BEFORE evaluating, so exactly k members
            # are in the window at each check.
            if i >= k:
                old = nums[i - k]
                counts[old] -= 1
                if counts[old] == 0:
                    del counts[old]
                window_sum -= old
            # k slots holding k distinct values means no repeats.
            if i >= k - 1 and len(counts) == k:
                if window_sum > best:
                    best = window_sum
        return best
