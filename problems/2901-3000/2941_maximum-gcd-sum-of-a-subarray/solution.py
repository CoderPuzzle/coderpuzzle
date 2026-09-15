from math import gcd
from typing import List


class Solution:
    def maxGcdSum(self, nums: List[int], k: int) -> int:
        n = len(nums)
        prefix = [0] * (n + 1)
        for i, v in enumerate(nums):
            prefix[i + 1] = prefix[i] + v
        best = 0
        # tails holds one [g, r] entry per distinct gcd value among the
        # windows nums[lo..j], r being the largest end that reaches it,
        # with g strictly decreasing. Each drop at least halves g, so the
        # list never exceeds log2(max(nums)) + 1 entries.
        tails: List[List[int]] = []
        for lo in range(n - 1, -1, -1):
            new = [[nums[lo], lo]]
            for g, r in tails:
                ng = gcd(g, nums[lo])
                if new[-1][0] == ng:
                    new[-1][1] = r
                else:
                    new.append([ng, r])
            tails = new
            for g, r in tails:
                if r - lo + 1 >= k:
                    # Elements are positive, so the longest window with a
                    # given gcd also carries the largest sum.
                    candidate = g * (prefix[r + 1] - prefix[lo])
                    if candidate > best:
                        best = candidate
        return best
