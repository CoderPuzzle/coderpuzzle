from typing import List, Optional


class Solution:
    def minPatches(self, nums: List[int], n: int) -> int:
        patches = 0
        i = 0
        # Invariant: every sum in [1, reachable) is formable; reachable
        # itself is the smallest sum that is not.
        reachable = 1
        while reachable <= n:
            # Consume nums[i] while it fits inside the covered range: it
            # extends coverage to [1, reachable + nums[i]) at no patch cost.
            if i < len(nums) and nums[i] <= reachable:
                reachable += nums[i]
                i += 1
            else:
                # Genuine gap: patch reachable itself (any smaller patch
                # covers less, any larger leaves the gap) and double.
                reachable += reachable
                patches += 1
        return patches
