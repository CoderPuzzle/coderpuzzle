from typing import List


class Solution:
    def maxDotProduct(self, nums1: List[int], nums2: List[int]) -> int:
        n, m = len(nums1), len(nums2)
        NEG = float("-inf")
        dp = [[NEG] * (m + 1) for _ in range(n + 1)]
        for i in range(n - 1, -1, -1):
            for j in range(m - 1, -1, -1):
                pair = nums1[i] * nums2[j]
                tail = dp[i + 1][j + 1]
                dp[i][j] = max(pair + (tail if tail > 0 else 0), dp[i + 1][j], dp[i][j + 1])
        return dp[0][0]
