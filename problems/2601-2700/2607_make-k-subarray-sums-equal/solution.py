from typing import List, Optional

from math import gcd


class Solution:
    def makeSubKSumEqual(self, arr: List[int], k: int) -> int:
        n = len(arr)
        # Adjacent windows of length k must agree, forcing arr[(i+k) mod n] =
        # arr[i]: stepping by k around the cycle visits exactly one residue
        # class mod g = gcd(n, k), and each class being constant is also
        # sufficient — any window then picks up each class k/g times.
        g = gcd(n, k)
        total = 0
        for r in range(g):
            group = sorted(arr[i] for i in range(r, n, g))
            # Unit steps are cheapest around a median; classes are
            # independent, so costs simply add up.
            median = group[len(group) // 2]
            total += sum(abs(v - median) for v in group)
        return total
