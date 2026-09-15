from typing import List, Optional


class Solution:
    def maximumTastiness(self, price: List[int], k: int) -> int:
        # In a sorted selection the minimum pairwise gap always occurs between
        # adjacent picks, so sorting once reduces the problem to chain gaps.
        price = sorted(price)

        def feasible(x):
            # Leftmost greedy: take the first candy, then each candy at least x
            # above the last taken one. Postponing a pick can only shrink the
            # room left for later picks, so this maximizes how many fit.
            count = 1
            last = price[0]
            for p in price[1:]:
                if p - last >= x:
                    count += 1
                    last = p
            return count >= k

        # "Every gap >= x is achievable" is monotone in x, so binary search the
        # largest feasible x over [0, max-min]. The upper-mid +1 keeps lo = mid
        # from stalling; identical prices converge to lo = 0.
        lo, hi = 0, price[-1] - price[0]
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if feasible(mid):
                lo = mid
            else:
                hi = mid - 1
        return lo
