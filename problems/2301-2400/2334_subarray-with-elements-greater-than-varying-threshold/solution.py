from typing import List, Optional


class Solution:
    def validSubarraySize(self, nums: List[int], threshold: int) -> int:
        n = len(nums)
        # next_le[i] = nearest index j > i with nums[j] <= nums[i]
        next_le = [n] * n
        stack = []
        for i in range(n - 1, -1, -1):
            while stack and nums[stack[-1]] > nums[i]:
                stack.pop()
            next_le[i] = stack[-1] if stack else n
            stack.append(i)

        # prev_lt[i] = nearest index j < i with nums[j] < nums[i]
        prev_lt = [-1] * n
        stack = []
        for i in range(n):
            while stack and nums[stack[-1]] >= nums[i]:
                stack.pop()
            prev_lt[i] = stack[-1] if stack else -1
            stack.append(i)

        best = -1
        for i in range(n):
            span = next_le[i] - prev_lt[i] - 1
            k = threshold // nums[i] + 1
            if k <= span and (best == -1 or k < best):
                best = k
        return best
