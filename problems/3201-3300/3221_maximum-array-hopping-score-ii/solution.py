from typing import List


class Solution:
    def maxScore(self, nums: List[int]) -> int:
        # The optimal path always lands on the farthest index attaining the
        # maximum of the remaining suffix: every element after the current
        # position is at most that maximum, so routing through it trades
        # each leg for at least as much value per unit of distance over the
        # same ground, and equal maxima favor the later occurrence (same
        # value, longer hop). Build those farthest suffix argmaxes right to
        # left, then walk the chain from index 0.
        n = len(nums)
        farthest = [0] * n
        farthest[n - 1] = n - 1
        for i in range(n - 2, -1, -1):
            if nums[i] > nums[farthest[i + 1]]:
                farthest[i] = i
            else:
                farthest[i] = farthest[i + 1]
        score = 0
        pos = 0
        while pos < n - 1:
            nxt = farthest[pos + 1]
            score += (nxt - pos) * nums[nxt]
            pos = nxt
        return score
