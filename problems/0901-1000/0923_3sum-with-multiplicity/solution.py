from typing import List, Optional


class Solution:
    def threeSumMulti(self, arr: List[int], target: int) -> int:
        # Count occurrences of each value, then enumerate value pairs
        # (a, b) with a <= b; the required third value c = target - a - b
        # is accepted only when c >= b, so each unordered value multiset
        # {a, b, c} is priced exactly once. The index count is C(ca, 3)
        # when a == b == c, C(ca, 2) * cc or ca * C(cb, 2) when exactly
        # two coincide, and ca * cb * cc when all three differ — each
        # term reduced mod 10^9 + 7 as it is added, since C(3000, 3) is
        # far past 32 bits before the modulus ever fires.
        MOD = 10**9 + 7
        counts = {}
        for value in arr:
            counts[value] = counts.get(value, 0) + 1
        values = sorted(counts)
        d = len(values)
        total = 0
        for i in range(d):
            a = values[i]
            for j in range(i, d):
                b = values[j]
                c = target - a - b
                if c < b:
                    break
                cc = counts.get(c)
                if cc is None:
                    continue
                ca, cb = counts[a], counts[b]
                if a == b == c:
                    term = ca * (ca - 1) * (ca - 2) // 6
                elif a == b:
                    term = ca * (ca - 1) // 2 * cc
                elif b == c:
                    term = ca * cb * (cb - 1) // 2
                else:
                    term = ca * cb * cc
                total = (total + term) % MOD
        return total
