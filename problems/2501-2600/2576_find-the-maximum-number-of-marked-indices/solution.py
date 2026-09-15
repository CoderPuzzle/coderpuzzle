from typing import List, Optional


class Solution:
    def maxNumOfMarkedIndices(self, nums: List[int]) -> int:
        nums = sorted(nums)
        n = len(nums)
        i = 0
        # Large partners must come from the upper half: with p pairs the
        # smalls are p elements of the lower part and the larges p of the
        # upper, so j starts at the midpoint.
        for j in range((n + 1) // 2, n):
            # Match in sorted order (exchange argument): pairing the smallest
            # remaining small with the smallest qualifying large never costs
            # a match, and i only advances on a successful pair.
            if 2 * nums[i] <= nums[j]:
                i += 1
        # i counts pairs; every pair marks two indices.
        return 2 * i
