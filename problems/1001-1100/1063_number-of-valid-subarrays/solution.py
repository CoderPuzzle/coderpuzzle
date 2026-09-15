from typing import List, Optional


class Solution:
    def validSubarrays(self, nums: List[int]) -> int:
        # For each start i, valid subarrays extend until the first element
        # strictly smaller than nums[i]; count via a monotonic stack.
        n = len(nums)
        total = 0
        stack = []
        for i in range(n + 1):
            current = -1 if i == n else nums[i]
            while stack and nums[stack[-1]] > current:
                j = stack.pop()
                total += i - j
            stack.append(i)
        return total
