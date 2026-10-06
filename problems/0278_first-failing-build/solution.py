class Solution:
    def locateFirstFailure(self, buildInspector: BuildInspector, n: int) -> int:
        # The predicate flips exactly once along [1, n] — good up to the
        # hidden boundary, bad from it on — so bisect for the first true.
        lo, hi = 1, n
        while lo < hi:
            # Overflow-safe midpoint: lo + (hi - lo) // 2 never exceeds hi,
            # where (lo + hi) // 2 can overflow a fixed-width integer on the
            # full [1, 2**31 - 1] range.
            mid = lo + (hi - lo) // 2
            if buildInspector.isFailingBuild(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
