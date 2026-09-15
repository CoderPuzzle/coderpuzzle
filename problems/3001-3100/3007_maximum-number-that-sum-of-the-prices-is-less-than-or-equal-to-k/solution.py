from typing import List, Optional


class Solution:
    def findMaximumNumber(self, k: int, x: int) -> int:
        # Accumulated price of n: for each watched bit position p = x, 2x, ...,
        # count how many numbers in [1, n] have bit p-1 set.
        def price_sum(n):
            total = 0
            p = x
            # Positions with 2^(p-1) > n contribute nothing, so stop there.
            while (1 << (p - 1)) <= n:
                b = p - 1
                # Bit b alternates in blocks of 2^b set / 2^b clear: count full
                # cycles plus the partial one over the first n+1 values.
                cycle = 1 << (b + 1)
                full = (n + 1) // cycle
                rem = (n + 1) % cycle
                half = 1 << b
                total += full * half + max(0, rem - half)
                p += x
            return total

        # The accumulated price is nondecreasing in n, so the answer is the
        # largest n with price_sum(n) <= k. First double hi until it is expensive.
        lo, hi = 0, 10**16
        while price_sum(hi) <= k:
            hi *= 2
        # Invariant: lo is cheap, hi is expensive; lo ends as the answer.
        while lo + 1 < hi:
            mid = (lo + hi) // 2
            if price_sum(mid) <= k:
                lo = mid
            else:
                hi = mid
        return lo
