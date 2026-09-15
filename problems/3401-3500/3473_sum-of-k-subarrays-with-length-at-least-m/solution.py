from typing import List, Optional


class Solution:
    def maxSum(self, nums: List[int], k: int, m: int) -> int:
        NEG = float("-inf")

        n = len(nums)
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + nums[i]
        # dp over rows: prev[j] = best sum of (i-1) subarrays within first j elements
        prev = [0] * (n + 1)  # i = 0
        for _ in range(1, k + 1):
            cur = [NEG] * (n + 1)
            best = NEG  # running max of prev[t] - prefix[t] for t <= j - m
            for j in range(1, n + 1):
                t = j - m
                if t >= 0:
                    cand = prev[t] - prefix[t]
                    if cand > best:
                        best = cand
                if best != NEG:
                    val = prefix[j] + best
                    cur[j] = cur[j - 1] if cur[j - 1] > val else val
                else:
                    cur[j] = cur[j - 1]
            prev = cur
        return prev[n]
