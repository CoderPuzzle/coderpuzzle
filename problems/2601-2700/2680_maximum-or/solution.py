from typing import List


class Solution:
    def maximumOr(self, nums: List[int], k: int) -> int:
        n = len(nums)
        # suffix[i] = OR of nums[i:], so the OR of every element except i
        # is prefix | suffix in O(1) while i sweeps left to right.
        suffix = [0] * (n + 1)
        for i in range(n - 1, -1, -1):
            suffix[i] = suffix[i + 1] | nums[i]
        best = 0
        prefix = 0
        for i in range(n):
            # All k doublings on nums[i]: the OR's top bit comes from one
            # element, and giving that element every operation only pushes
            # its bits higher, so split plans are never better.
            candidate = prefix | (nums[i] << k) | suffix[i + 1]
            if candidate > best:
                best = candidate
            prefix |= nums[i]
        return best
