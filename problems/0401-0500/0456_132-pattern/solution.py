from typing import List, Optional


class Solution:
    def find132pattern(self, nums: List[int]) -> bool:
        if len(nums) < 3:
            return False
        stack = []
        # Scan right-to-left; `third` is the largest value known to sit after
        # something bigger — the best nums[k] candidate (-inf = none yet).
        third = float("-inf")
        for value in reversed(nums):
            # Current value below third makes it a valid nums[i]; the pair
            # that produced third lies entirely to its right.
            if value < third:
                return True
            # Popped values are smaller than `value` and lie to its right,
            # so each has a larger number before it; the last (largest)
            # popped becomes third. The stack stays monotonically decreasing.
            while stack and stack[-1] < value:
                third = stack.pop()
            stack.append(value)
        return False
