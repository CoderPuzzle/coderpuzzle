class Solution:
    def mySqrt(self, x: int) -> int:
        # Binary search for the largest m with m * m <= x: the predicate is
        # monotone (past the root, every square overshoots), so halving the
        # candidate interval lands exactly on the rounded-down square root.
        low, high = 0, x
        while low < high:
            # Round the midpoint up: with a plain floor the interval can stop
            # shrinking when low == mid, and the loop would never terminate.
            mid = (low + high + 1) // 2
            if mid * mid <= x:
                low = mid
            else:
                high = mid - 1
        return low
