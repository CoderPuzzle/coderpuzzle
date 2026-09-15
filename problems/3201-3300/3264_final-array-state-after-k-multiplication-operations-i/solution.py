from typing import List


class Solution:
    def getFinalState(self, nums: List[int], k: int, multiplier: int) -> List[int]:
        # The bounds are tiny (n <= 100, k <= 10), so replay the process
        # literally: each operation makes one linear scan for the first
        # occurrence of the minimum — a strict '<' comparison never replaces
        # an equal earlier value, so ties resolve to the leftmost index —
        # and multiplies that slot. No heap is needed to accelerate ten
        # short scans, and no wider arithmetic either: an element is
        # multiplied at most k times, so it never exceeds
        # 100 * 5^10 = 976562500 < 2^31 - 1.
        n = len(nums)
        for _ in range(k):
            idx = 0
            for i in range(1, n):
                if nums[i] < nums[idx]:
                    idx = i
            nums[idx] *= multiplier
        return nums
