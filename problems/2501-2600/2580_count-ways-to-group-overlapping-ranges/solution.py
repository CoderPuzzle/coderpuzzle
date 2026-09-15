from typing import List


class Solution:
    def countWays(self, ranges: List[List[int]]) -> int:
        # Sort by start point; overlapping ranges then form contiguous
        # runs. One sweep counts how many maximal runs there are: a run
        # breaks exactly when the next start lies beyond the furthest
        # end seen so far. Each run can sit in either group freely, so
        # the answer is 2^(number of runs) mod 10^9 + 7, computed by
        # iterative binary exponentiation (no recursion anywhere).
        MOD = 10**9 + 7
        rs = sorted(ranges)
        groups = 1
        reach = rs[0][1]
        for s, e in rs[1:]:
            if s > reach:
                groups += 1
                reach = e
            elif e > reach:
                reach = e
        return pow(2, groups, MOD)
