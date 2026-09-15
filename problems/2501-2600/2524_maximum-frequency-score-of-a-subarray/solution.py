from typing import List, Optional


class Solution:
    def maxFrequencyScore(self, nums: List[int], k: int) -> int:
        # Sliding window maintaining the score as the sum of per-value
        # power terms under 10^9 + 7. The term map stores the exact
        # contribution v^count of every value inside the window; a slide
        # replaces only the entering and leaving values' terms, which is
        # O(log MOD) per step via binary powering.
        MOD = 10**9 + 7

        def qpow(base: int, exp: int) -> int:
            result = 1
            while exp:
                if exp & 1:
                    result = result * base % MOD
                base = base * base % MOD
                exp >>= 1
            return result

        counts = {}
        terms = {}
        score = 0
        best = 0
        for i, value in enumerate(nums):
            # entering value joins with its full v^count term
            c = counts.get(value, 0) + 1
            counts[value] = c
            term = qpow(value, c)
            score = (score + term - terms.get(value, 0)) % MOD
            terms[value] = term
            if i >= k:
                leaving = nums[i - k]
                lc = counts[leaving]
                counts[leaving] = lc - 1
                if lc == 1:
                    # the leaving value exits entirely; its term vanishes
                    score = (score - terms[leaving]) % MOD
                    del terms[leaving]
                else:
                    term = qpow(leaving, lc - 1)
                    score = (score + term - terms[leaving]) % MOD
                    terms[leaving] = term
            if i >= k - 1:
                best = max(best, score)
        return best
