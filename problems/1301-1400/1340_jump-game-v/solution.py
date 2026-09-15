from typing import List


class Solution:
    def maxJumps(self, arr: List[int], d: int) -> int:
        # Process indices in increasing height order: every one-jump target is
        # strictly lower, so its dp value is already final when needed. Each
        # directional walk stops at the first wall (an index not lower).
        n = len(arr)
        order = sorted(range(n), key=lambda i: arr[i])
        dp = [1] * n
        for i in order:
            j = i + 1
            while j < n and j - i <= d and arr[j] < arr[i]:
                dp[i] = max(dp[i], 1 + dp[j])
                j += 1
            j = i - 1
            while j >= 0 and i - j <= d and arr[j] < arr[i]:
                dp[i] = max(dp[i], 1 + dp[j])
                j -= 1
        return max(dp)
