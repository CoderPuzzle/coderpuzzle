import heapq
from math import gcd
from typing import List


class Solution:
    def minimumIncrements(self, nums: List[int], target: List[int]) -> int:
        # An optimal plan serves each group of targets with a single
        # element (a multiple of the group's lcm), so it uses at most m
        # elements in total, and an exchange argument keeps every group's
        # element among the m cheapest servants of that group — the dp
        # below only sweeps those few candidates. Subsets whose lcm
        # exceeds CAP are skipped: serving such a subset with one element
        # costs more than serving its targets separately ever can, and
        # the lcm fold stays below 10^9.
        m = len(target)
        full = (1 << m) - 1
        CAP = 100000
        INF = float("inf")
        lcms = [1] * (full + 1)
        for mask in range(1, full + 1):
            low = mask & -mask
            l = lcms[mask ^ low]
            t = target[low.bit_length() - 1]
            l = l // gcd(l, t) * t
            lcms[mask] = l if l <= CAP else 0
        cand = set()
        for sub in range(1, full + 1):
            l = lcms[sub]
            if l == 0:
                continue
            for _, i in heapq.nsmallest(m, (((l - x % l) % l, i) for i, x in enumerate(nums))):
                cand.add(i)
        dp = [INF] * (full + 1)
        dp[0] = 0
        for i in sorted(cand):
            x = nums[i]
            ndp = dp[:]
            for mask in range(full + 1):
                base = dp[mask]
                if base == INF:
                    continue
                comp = full ^ mask
                sub = comp
                while sub:
                    l = lcms[sub]
                    if l:
                        cand_cost = base + (l - x % l) % l
                        if cand_cost < ndp[mask | sub]:
                            ndp[mask | sub] = cand_cost
                    sub = (sub - 1) & comp
            dp = ndp
        return dp[full]
