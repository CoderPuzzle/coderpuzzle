from typing import List


class Solution:
    def minCost(self, nums: List[int], costs: List[int]) -> int:
        n = len(nums)
        next_ge = [-1] * n
        next_lt = [-1] * n
        greater_stack = []
        lower_stack = []
        for index in range(n - 1, -1, -1):
            while greater_stack and nums[greater_stack[-1]] < nums[index]:
                greater_stack.pop()
            if greater_stack:
                next_ge[index] = greater_stack[-1]
            greater_stack.append(index)
            while lower_stack and nums[lower_stack[-1]] >= nums[index]:
                lower_stack.pop()
            if lower_stack:
                next_lt[index] = lower_stack[-1]
            lower_stack.append(index)
        best = [1 << 62] * n
        best[0] = 0
        for index in range(n):
            for target in (next_ge[index], next_lt[index]):
                if target != -1 and best[index] + costs[target] < best[target]:
                    best[target] = best[index] + costs[target]
        return best[n - 1]
