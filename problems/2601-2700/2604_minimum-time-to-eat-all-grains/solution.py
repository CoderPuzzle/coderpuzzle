from typing import List


class Solution:
    def minimumTime(self, hens: List[int], grains: List[int]) -> int:
        # Binary search the answer T, checked by a greedy sweep. With both
        # arrays sorted, hens in ascending order eating contiguous grain
        # prefixes is optimal by an exchange argument. A hen at h covering
        # grains up to g needs L + R + min(L, R) seconds, where
        # L = max(0, h - leftmost) and R = max(0, rightmost - h): whichever
        # extreme the hen reaches second becomes the double-walked detour.
        hens.sort()
        grains.sort()

        def feasible(t: int) -> bool:
            j = 0
            for h in hens:
                if j == len(grains):
                    break
                left = max(0, h - grains[j])
                # This hen can absorb grain k exactly when t covers its
                # detour cost; extending k monotonically keeps the greedy
                # assignment a prefix split.
                k = j
                while k < len(grains):
                    right = max(0, grains[k] - h)
                    if min(2 * left + right, left + 2 * right) > t:
                        break
                    k += 1
                j = k
            return j == len(grains)

        # Positions lie in [0, 10^9], so any segment cost satisfies
        # L + R <= 10^9 and 2L + R = L + (L + R) <= 1.5 * 10^9 — the hi
        # bound below strictly dominates every feasible answer.
        lo, hi = 0, 2_000_000_000
        while lo < hi:
            mid = lo + (hi - lo) // 2
            if feasible(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
