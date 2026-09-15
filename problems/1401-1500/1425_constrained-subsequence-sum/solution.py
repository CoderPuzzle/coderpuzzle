from collections import deque
from typing import List, Optional


class Solution:
    def constrainedSubsetSum(self, nums: List[int], k: int) -> int:
        n = len(nums)
        dp = [0] * n
        dq = deque()  # indices, dp values decreasing
        best = -(10**18)
        for i, x in enumerate(nums):
            while dq and dq[0] < i - k:
                dq.popleft()
            prev = dp[dq[0]] if dq else 0
            if prev < 0:
                prev = 0
            dp[i] = x + prev
            while dq and dp[dq[-1]] <= dp[i]:
                dq.pop()
            dq.append(i)
            if dp[i] > best:
                best = dp[i]
        return best
