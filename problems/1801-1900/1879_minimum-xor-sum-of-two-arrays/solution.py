from typing import List, Optional


class Solution:
    def minimumXORSum(self, nums1: List[int], nums2: List[int]) -> int:
        n = len(nums1)
        size = 1 << n
        INF = float("inf")
        dp = [INF] * size
        dp[0] = 0
        for mask in range(1, size):
            i = bin(mask).count("1") - 1  # index into nums1 for this subset
            x = nums1[i]
            best = INF
            m = mask
            while m:
                lowbit = m & (-m)
                j = lowbit.bit_length() - 1
                cand = dp[mask ^ lowbit] + (x ^ nums2[j])
                if cand < best:
                    best = cand
                m -= lowbit
            dp[mask] = best
        return dp[size - 1]
