from typing import List


class Solution:
    def maxWidthRamp(self, nums: List[int]) -> int:
        # Monotonic stack of record lows: an index matters as a left end
        # only when no earlier index holds a smaller value.
        stack = []
        for i, x in enumerate(nums):
            if not stack or nums[stack[-1]] > x:
                stack.append(i)
        # Right-to-left: the first (largest) j that dominates a stack top
        # pops it at that top's widest possible width.
        best = 0
        for j in range(len(nums) - 1, -1, -1):
            while stack and nums[stack[-1]] <= nums[j]:
                top = stack.pop()
                best = max(best, j - top)
        return best
