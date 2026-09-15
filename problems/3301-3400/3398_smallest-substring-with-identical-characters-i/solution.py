class Solution:
    def minLength(self, s: str, numOps: int) -> int:
        # Binary search the answer m. m == 1 needs full alternation, so the
        # cost is the smaller Hamming distance to one of the two alternating
        # targets; for m >= 2 a run of length L independently costs
        # floor(L / (m + 1)) flips, all placeable strictly inside the run so
        # runs never merge.
        n = len(s)

        def ok(m):
            if m == 1:
                alt = sum(1 for i, c in enumerate(s) if c != "01"[i % 2])
                return min(alt, n - alt) <= numOps
            flips = 0
            run = 1
            for i in range(1, n):
                if s[i] == s[i - 1]:
                    run += 1
                else:
                    flips += run // (m + 1)
                    run = 1
            return flips + run // (m + 1) <= numOps

        lo, hi = 1, n
        while lo < hi:
            mid = (lo + hi) // 2
            if ok(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
