from typing import List, Optional


class Solution:
    def maxDistance(self, position: List[int], m: int) -> int:
        position = sorted(position)

        def feasible(distance: int) -> bool:
            # Greedy: the first ball sits at the leftmost basket (count = 1),
            # then each ball takes the first basket at least `distance` beyond
            # the last placed one. Earliest-possible placement is never worse,
            # so failure here means no placement works.
            count = 1
            last = position[0]
            for p in position[1:]:
                if p - last >= distance:
                    count += 1
                    last = p
                    if count >= m:
                        # All balls placed — exit early.
                        return True
            return count >= m

        # Feasibility is monotone in the spacing, so binary search the
        # largest feasible d over [1, span]; the upper-mid form keeps the
        # search moving when lo and hi become adjacent.
        lo, hi = 1, position[-1] - position[0]
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if feasible(mid):
                lo = mid
            else:
                hi = mid - 1
        return lo
