from typing import List, Optional

from math import gcd


class Solution:
    def countPairs(self, nums: List[int], k: int) -> int:
        # Bucket by g = gcd(num, k): the gcd strips every factor of num
        # irrelevant to divisibility by k, and num_i * num_j is divisible
        # by k exactly when (gi * gj) % k == 0. Each g divides k, so there
        # are at most d(k) groups.
        counts = {}
        for num in nums:
            g = gcd(num, k)
            counts[g] = counts.get(g, 0) + 1

        total = 0
        gs = list(counts)
        # Pair every two groups (a group with itself included).
        for i in range(len(gs)):
            for j in range(i, len(gs)):
                if (gs[i] * gs[j]) % k:
                    continue
                if i == j:
                    # Index pairs i < j inside one group: C(c, 2).
                    c = counts[gs[i]]
                    total += c * (c - 1) // 2
                else:
                    total += counts[gs[i]] * counts[gs[j]]
        return total
