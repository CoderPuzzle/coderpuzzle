class Solution:
    def maxSizedArray(self, s: int) -> int:
        # The total factors: sum over i, j, k of i*(j OR k) equals M * T,
        # with M = n(n-1)/2 and T the sum of (j OR k) over all pairs. T is
        # counted per bit: the OR of a pair has bit b set unless BOTH values
        # clear it, so bit b contributes 2^b * (n^2 - z_b^2), z_b the count
        # of values below n clearing bit b. f is nondecreasing, so double an
        # upper bound and binary search the largest n with M*T <= s.
        def fits(n: int) -> bool:
            if n <= 1:
                return True
            m = n * (n - 1) // 2
            total = 0
            b = 0
            while (1 << b) < 2 * n:
                set_count = (n >> (b + 1)) << b
                rem = n & ((1 << (b + 1)) - 1)
                if rem > (1 << b):
                    set_count += rem - (1 << b)
                total += (1 << b) * (n * n - (n - set_count) ** 2)
                b += 1
            # M*T <= s iff T <= s // M; dividing keeps intermediates small.
            return total <= s // m

        hi = 1
        while fits(hi):
            hi *= 2
        lo = 1
        while lo < hi:
            mid = (lo + hi) // 2
            if fits(mid):
                lo = mid + 1
            else:
                hi = mid
        return lo - 1
