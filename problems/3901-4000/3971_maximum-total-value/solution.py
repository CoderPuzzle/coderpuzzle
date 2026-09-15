class Solution:
    def maxTotalValue(self, value: list[int], decay: list[int], m: int) -> int:
        M = 1_000_000_007

        def count(g):
            return sum((a - g) // b + 1 for a, b in zip(value, decay) if a >= g)

        def total(g):
            z = 0
            for a, b in zip(value, decay):
                if a >= g:
                    c = (a - g) // b + 1
                    z = (z + (c % M) * (a % M) - (b % M) * (c % M) * ((c - 1) % M) * pow(2, M - 2, M)) % M
            return z

        c = count(1)
        if c <= m:
            return total(1)
        lo, hi = 1, max(value)
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if count(mid) >= m:
                lo = mid
            else:
                hi = mid - 1
        g = lo
        c = count(g + 1)
        return (total(g + 1) + (m - c) % M * (g % M)) % M
