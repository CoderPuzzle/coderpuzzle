from typing import List

INF = float("inf")


class Solution:
    def findMaxVal(self, n: int, restrictions: List[List[int]], diff: List[int]) -> int:
        # Upper bound per position from left-propagated caps and
        # restrictions. Position 0 carries the sequence's own anchor:
        # a[0] = 0, so no value can exceed what diff allows away from it.
        cap = [INF] * n
        cap[0] = 0
        for idx, max_val in sorted(restrictions):
            if max_val < cap[idx]:
                cap[idx] = max_val
        for i in range(1, n):
            if cap[i - 1] + diff[i - 1] < cap[i]:
                cap[i] = cap[i - 1] + diff[i - 1]

        # Right pass mirrors it: a tight bound at j also caps every
        # position i < j to cap[j] + sum(diff[i..j-1]).
        for i in range(n - 2, -1, -1):
            if cap[i + 1] + diff[i] < cap[i]:
                cap[i] = cap[i + 1] + diff[i]

        # The optimal sequence attains every bound simultaneously, so the
        # largest value in it is the largest bound.
        return max(cap)
