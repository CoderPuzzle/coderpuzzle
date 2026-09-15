from typing import List, Optional


class Solution:
    def maxUncrossedLines(self, nums1: List[int], nums2: List[int]) -> int:
        # Longest common subsequence of nums1 and nums2.
        n = len(nums2)
        prev = [0] * (n + 1)
        for a in nums1:
            cur = [0] * (n + 1)
            for j in range(1, n + 1):
                if a == nums2[j - 1]:
                    cur[j] = prev[j - 1] + 1
                else:
                    cur[j] = cur[j - 1] if cur[j - 1] > prev[j] else prev[j]
            prev = cur
        return prev[n]
