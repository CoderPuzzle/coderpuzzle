from typing import List, Optional


class Solution:
    def canJump(self, nums: List[int]) -> bool:
        # `farthest` is the largest index reachable using any sequence of
        # jumps among positions visited so far; an index is standable
        # exactly when index <= farthest (reachability grows continuously).
        farthest = 0
        last = len(nums) - 1
        for index, reach in enumerate(nums):
            # Standability check first: a gap no jump can cross has opened,
            # so the last index is unreachable. Must run before the update.
            if index > farthest:
                return False
            if index + reach > farthest:
                farthest = index + reach
            # The reach now covers the last index: answer true on the spot
            # (also covers the single-element input, with farthest = 0).
            if farthest >= last:
                return True
        return True
