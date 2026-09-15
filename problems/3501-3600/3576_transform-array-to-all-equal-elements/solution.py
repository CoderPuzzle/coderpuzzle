from typing import List


class Solution:
    def canMakeEqual(self, nums: List[int], k: int) -> bool:
        # Position i is touched only by the flips at i - 1 and at i, so
        # scanning left to right every flip is forced: prev remembers
        # whether the flip at i - 1 fired, and the flip at i must fire
        # exactly when the resulting value misses the target.
        def can_make(target: int) -> bool:
            ops = 0
            prev = False
            for i in range(len(nums) - 1):
                prev = nums[i] * (-1 if prev else 1) != target
                ops += prev
            # The last element has no flip of its own left: the target is
            # only reachable if it already came out right.
            return nums[-1] * (-1 if prev else 1) == target and ops <= k

        return can_make(1) or can_make(-1)
