from typing import List, Optional


class Solution:
    def minimumIncompatibility(self, nums: List[int], k: int) -> int:
        # Every group has exactly n/k elements and no repeated value, so a
        # group is a set of n/k indices whose values are pairwise distinct —
        # and with values in 1..n, distinctness is itself a 16-bit check.
        # Precompute every valid group once, with cost max - min, bucketed
        # under each index it contains, then run a DP over bitmasks of
        # undistributed elements: each state removes the group covering its
        # lowest remaining index, which collapses the k! orderings of one
        # partition, and a full mask no group ever reaches is the -1 case.
        n = len(nums)
        size = n // k
        total = 1 << n
        buckets = [[] for _ in range(n)]
        for g in range(total):
            if bin(g).count("1") != size:
                continue
            seen = 0
            lo = n + 1
            hi = 0
            valid = True
            for i in range(n):
                if g >> i & 1:
                    vbit = 1 << (nums[i] - 1)
                    if seen & vbit:
                        valid = False
                        break
                    seen |= vbit
                    if nums[i] < lo:
                        lo = nums[i]
                    if nums[i] > hi:
                        hi = nums[i]
            if not valid:
                continue
            cost = hi - lo
            for i in range(n):
                if g >> i & 1:
                    buckets[i].append((g, cost))
        INF = 1_000_000
        dp = [INF] * total
        dp[0] = 0
        for mask in range(1, total):
            if bin(mask).count("1") % size:
                continue
            best = INF
            for g, cost in buckets[(mask & -mask).bit_length() - 1]:
                if g & mask == g and dp[mask ^ g] + cost < best:
                    best = dp[mask ^ g] + cost
            dp[mask] = best
        return -1 if dp[total - 1] >= INF else dp[total - 1]
