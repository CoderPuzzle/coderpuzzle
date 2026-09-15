from typing import List
from collections import deque


class Solution:
    def maxResult(self, nums: List[int], k: int) -> int:
        n = len(nums)
        dp = [0] * n
        dp[0] = nums[0]
        # The deque holds indices with strictly decreasing dp values; it turns
        # dp[i] = nums[i] + max(dp[i-k .. i-1]) into a sliding-window maximum
        # answered in amortized O(1) per step.
        window = deque([0])
        for i in range(1, n):
            # Expire front indices that left the [i-k, i-1] hop window; the
            # front is then exactly the window's maximum.
            while window[0] < i - k:
                window.popleft()
            dp[i] = nums[i] + dp[window[0]]
            # Back entries with dp <= dp[i] can never be a window max again
            # while i is alive; <= also collapses equal scores.
            while window and dp[window[-1]] <= dp[i]:
                window.pop()
            window.append(i)
        return dp[n - 1]
