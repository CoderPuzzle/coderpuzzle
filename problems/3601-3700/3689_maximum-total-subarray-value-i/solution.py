from typing import List


class Solution:
    def maxTotalValue(self, nums: List[int], k: int) -> int:
        # No subarray can beat the whole array: it sees only a subset of
        # the elements, so its maximum never exceeds the global maximum
        # and its minimum never drops below the global minimum. Repeating
        # the whole array as every pick attains that spread k times.
        return (max(nums) - min(nums)) * k
