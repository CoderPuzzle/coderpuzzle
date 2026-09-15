class Solution:
    def nthUglyNumber(self, n: int, a: int, b: int, c: int) -> int:
        def gcd(x: int, y: int) -> int:
            while y:
                x, y = y, x % y
            return x

        def lcm(x: int, y: int) -> int:
            return x // gcd(x, y) * y

        ab, ac, bc = lcm(a, b), lcm(a, c), lcm(b, c)
        abc = lcm(ab, c)

        def count(x: int) -> int:
            # ugly numbers <= x via inclusion-exclusion: add each
            # divisor's multiples, subtract the pairwise lcms (counted
            # twice), add back the triple lcm
            return x // a + x // b + x // c - x // ab - x // ac - x // bc + x // abc

        # count(x) is non-decreasing, so binary search the smallest x with
        # count(x) >= n — that x is itself ugly; hi is the answer ceiling
        lo, hi = 1, 2 * 10**9
        while lo < hi:
            mid = (lo + hi) // 2
            if count(mid) >= n:
                hi = mid
            else:
                lo = mid + 1
        return lo
