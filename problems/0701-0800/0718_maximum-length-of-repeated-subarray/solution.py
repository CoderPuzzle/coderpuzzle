from typing import List, Optional


class Solution:
    def findLength(self, nums1: List[int], nums2: List[int]) -> int:
        m, n = len(nums1), len(nums2)
        # dp[j] = longest common run starting exactly at nums1[i+1], nums2[j];
        # sweeping i downward keeps row i+1 available when row i is computed.
        dp = [0] * (n + 1)
        best = 0
        for i in range(m - 1, -1, -1):
            new = [0] * (n + 1)
            for j in range(n - 1, -1, -1):
                if nums1[i] == nums2[j]:
                    # Match extends the run starting at (i+1, j+1); a mismatch
                    # leaves 0 — no shared subarray starts there.
                    new[j] = dp[j + 1] + 1
                    if new[j] > best:
                        best = new[j]
            # Roll: only the previous row is ever read.
            dp = new
        return best
