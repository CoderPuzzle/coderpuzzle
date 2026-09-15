from typing import List


class Solution:
    def findMaximumScore(self, nums: List[int]) -> int:
        # The optimal first hop out of any position lands on the nearest
        # later index holding a strictly greater value: everything in
        # between is at most the current value, so any detour's legs earn
        # no more per unit of distance than staying put over the same
        # ground, while the leg beyond the swap gains the strictly larger
        # rate. When no greater value remains, jumping straight to the
        # last index is optimal by the same telescoping bound. Precompute
        # those nearest greater neighbors with a right-to-left monotonic
        # stack, then walk the chain.
        n = len(nums)
        jump = [n - 1] * n
        stack = []
        for i in range(n - 1, -1, -1):
            while stack and nums[stack[-1]] <= nums[i]:
                stack.pop()
            if stack:
                jump[i] = stack[-1]
            stack.append(i)
        score = 0
        pos = 0
        while pos < n - 1:
            score += (jump[pos] - pos) * nums[pos]
            pos = jump[pos]
        return score
