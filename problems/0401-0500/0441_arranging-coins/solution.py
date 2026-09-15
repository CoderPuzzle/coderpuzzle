class Solution:
    def arrangeCoins(self, n: int) -> int:
        # The answer is the largest k whose triangular total T(k) = k*(k+1)//2
        # fits inside n (rows 1..k cost 1+2+...+k coins, and the leftover
        # coins cannot finish row k+1). T is strictly increasing, so the
        # predicate T(mid) <= n is monotone: binary search the boundary, and
        # hi ends on the largest row count that fits.
        lo, hi = 1, n
        while lo <= hi:
            mid = (lo + hi) // 2
            if mid * (mid + 1) // 2 <= n:
                lo = mid + 1
            else:
                hi = mid - 1
        return hi
