from bisect import bisect_right
from typing import List


class Solution:
    def minMergeCost(self, lists: List[List[int]]) -> int:
        n = len(lists)
        size = 1 << n

        # Total length of every mask, built up from its lowest set bit.
        total_len = [0] * size
        for mask in range(1, size):
            low = mask & -mask
            total_len[mask] = total_len[mask ^ low] + len(lists[low.bit_length() - 1])

        # Left-middle median of every mask, found without materializing the
        # merged list: binary search the sorted value pool for the smallest
        # value with more than half the mask's elements at or below it,
        # counting each member list with its own binary search.
        vals = sorted(v for one in lists for v in one)
        med = [0] * size
        for mask in range(1, size):
            rank = (total_len[mask] - 1) // 2
            lo, hi = 0, len(vals) - 1
            while lo < hi:
                mid = (lo + hi) // 2
                cnt = 0
                for i in range(n):
                    if mask >> i & 1:
                        cnt += bisect_right(lists[i], vals[mid])
                if cnt > rank:
                    hi = mid
                else:
                    lo = mid + 1
            med[mask] = vals[lo]

        # dp over subsets: the last merge of a mask always pays the mask's
        # total length plus the gap between the two merged-in medians, so
        # only the split itself is a free choice.
        INF = float("inf")
        dp = [INF] * size
        for mask in range(1, size):
            if not mask & (mask - 1):
                dp[mask] = 0
                continue
            best = INF
            sub = (mask - 1) & mask
            while sub:
                other = mask ^ sub
                if sub < other:  # each unordered split exactly once
                    cost = dp[sub] + dp[other] + total_len[mask] + abs(med[sub] - med[other])
                    if cost < best:
                        best = cost
                sub = (sub - 1) & mask
            dp[mask] = best
        return dp[size - 1]
