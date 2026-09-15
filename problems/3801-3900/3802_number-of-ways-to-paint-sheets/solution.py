from bisect import bisect_left
from typing import List


class Solution:
    def numberOfWays(self, n: int, limit: List[int]) -> int:
        MOD = 10**9 + 7
        m = len(limit)
        a = sorted(limit)

        # num_ge(t): colors whose limit reaches t — m minus the sorted
        # limits strictly below t.
        def num_ge(t: int) -> int:
            return m - bisect_left(a, t)

        # Ways for one split length x: ordered pairs of distinct colors
        # whose caps cover x and n - x; the i == j diagonal would need a
        # single cap to cover max(x, n - x).
        def ways(x: int) -> int:
            return num_ge(x) * num_ge(n - x) - num_ge(max(x, n - x))

        # ways(x) is a step function: its num_ge terms flip only when x
        # crosses 1, n, L + 1 or n - L for some cap L, plus the max()
        # switch at ceil(n / 2) — so one representative per breakpoint
        # run, scaled by the run length, covers every split in 1..n-1.
        points = {1, n, (n + 1) // 2}
        for cap in a:
            for candidate in (cap + 1, n - cap):
                if 1 <= candidate <= n:
                    points.add(candidate)
        ordered = sorted(points)
        total = 0
        for start, end in zip(ordered, ordered[1:]):
            total = (total + ways(start) % MOD * (end - start)) % MOD
        return total
