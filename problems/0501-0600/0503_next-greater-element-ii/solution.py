from typing import List


class Solution:
    def nextGreaterElements(self, nums: List[int]) -> List[int]:
        n = len(nums)
        result = [-1] * n
        stack: List[int] = []
        # One extra lap simulates the wrap-around without copying the array;
        # the resolver of any waiting index lies within one cycle ahead.
        for i in range(2 * n):
            idx = i % n
            # The stack holds indices with non-increasing values; the current
            # circular value is the first strictly greater one ahead of each
            # popped index (equal values are not popped).
            while stack and nums[stack[-1]] < nums[idx]:
                result[stack.pop()] = nums[idx]
            # Push only during the first lap; the second just resolves.
            if i < n:
                stack.append(idx)
        return result
