from typing import List, Optional


class Solution:
    def maxIncreasingGroups(self, usageLimits: List[int]) -> int:
        # Strictly increasing lengths force the optimal sizes to be 1..x —
        # trimming a larger group down keeps every condition valid. Number i
        # may appear at most once per group, so across any chosen m groups
        # it supplies at most min(limits[i], m) elements, while the m largest
        # groups (sizes x-m+1..x) demand m*(2*x-m+1)/2. That supply test must
        # hold for EVERY m <= x (the full total alone lies: [4,4,1,1] sums to
        # exactly what four groups need yet cannot staff a 4-group plus a
        # 3-group), and when all of them hold an assignment exists (bipartite
        # feasibility / integral flow). Sort ascending, sweep g[m] =
        # sum(min(v, m)) with a forward pointer, binary search the largest x.
        arr = sorted(usageLimits)
        n = len(arr)
        g = [0] * (n + 1)
        p = 0
        for m in range(1, n + 1):
            while p < n and arr[p] < m:
                p += 1
            # n - p is the count of entries >= m; each adds one element.
            g[m] = g[m - 1] + (n - p)

        def feasible(x: int) -> bool:
            for m in range(1, x + 1):
                if g[m] < m * (2 * x - m + 1) // 2:
                    return False
            return True

        lo, hi = 0, n
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if feasible(mid):
                lo = mid
            else:
                hi = mid - 1
        return lo
