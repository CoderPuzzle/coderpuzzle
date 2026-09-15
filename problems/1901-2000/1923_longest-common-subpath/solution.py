from typing import List, Optional


class Solution:
    def longestCommonSubpath(self, n: int, paths: List[List[int]]) -> int:
        # Two independent moduli paired in the key make an accidental collision
        # astronomically unlikely.
        MOD1 = 10**9 + 7
        MOD2 = 10**9 + 9
        BASE = 1000003

        def exists(length):
            if length == 0:
                return True
            common = None
            for path in paths:
                if len(path) < length:
                    return False
                h1 = h2 = 0
                power1 = power2 = 1
                # +1 per city id so a run of city 0 never hashes to the all-zero value.
                for i in range(length):
                    h1 = (h1 * BASE + path[i] + 1) % MOD1
                    h2 = (h2 * BASE + path[i] + 1) % MOD2
                    power1 = power1 * BASE % MOD1
                    power2 = power2 * BASE % MOD2
                hashes = {(h1, h2)}
                # Roll the window: multiply by base, drop the outgoing digit
                # weighted by BASE^L, add the incoming digit (constant per step).
                for i in range(length, len(path)):
                    h1 = (h1 * BASE - (path[i - length] + 1) * power1) % MOD1
                    h2 = (h2 * BASE - (path[i - length] + 1) * power2) % MOD2
                    h1 = (h1 + path[i] + 1) % MOD1
                    h2 = (h2 + path[i] + 1) % MOD2
                    hashes.add((h1, h2))
                # The first path seeds the set; each later path intersects into
                # it, bailing out the moment the intersection empties.
                if common is None:
                    common = hashes
                else:
                    common &= hashes
                    if not common:
                        return False
            return bool(common)

        # Existence is monotone in L (any prefix of a common subpath is common),
        # so upper-mid binary search converges on the maximum feasible length.
        lo, hi = 0, min(len(p) for p in paths)
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if exists(mid):
                lo = mid
            else:
                hi = mid - 1
        return lo
