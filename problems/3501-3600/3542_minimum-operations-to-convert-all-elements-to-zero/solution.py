from typing import List


class Solution:
    def minOperations(self, nums: List[int]) -> int:
        # Monotonic stack of the minima of currently open windows. An element
        # equal to the top continues that window's group (same operation), a
        # larger element opens a new group (one more operation), and anything
        # smaller — including 0 — closes every window above it.
        ans = 0
        stack = []
        for x in nums:
            while stack and stack[-1] > x:
                stack.pop()
            if x > 0 and (not stack or stack[-1] < x):
                ans += 1
                stack.append(x)
        return ans
