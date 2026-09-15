from typing import List
from math import gcd


class Solution:
    def maxGCDScore(self, nums: List[int], k: int) -> int:
        # Only the 2-adic tier t = v2(value) and the odd part of each
        # element matter: doubling bumps one element's tier by 1 and never
        # touches odd parts, so a window's gcd is 2^M * g where
        # g = gcd of odd parts and M is the promoted minimum tier.
        n = len(nums)
        odd = [v // (v & -v) for v in nums]
        tier = [(v & -v).bit_length() - 1 for v in nums]
        pow2 = [1 << i for i in range(34)]
        best = 0
        for l in range(n):
            g = 0
            cnt = [0] * 32
            m = 32
            for r in range(l, n):
                g = gcd(g, odd[r])
                t = tier[r]
                cnt[t] += 1
                if t < m:
                    m = t
                # Each element doubles at most once, so every element sits
                # at tier t or t+1: raising the minimum past m would need
                # the tier-m elements promoted twice — impossible. M is
                # m + 1 only when the budget covers every tier-m element.
                M = m + 1 if cnt[m] <= k else m
                score = (r - l + 1) * pow2[M] * g
                if score > best:
                    best = score
                # Windows further right from l: len <= n - l, g only
                # drops, M <= m + 1; stop once that bound can't beat best.
                # pow2 * g <= 2 * min value <= 2e9 keeps this in 64 bits.
                if pow2[m + 1] * g * (n - l) <= best:
                    break
        return best
