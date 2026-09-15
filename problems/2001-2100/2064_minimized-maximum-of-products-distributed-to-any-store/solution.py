from typing import List, Optional


class Solution:
    def minimizedMaximum(self, n: int, quantities: List[int]) -> int:
        def stores_needed(x):
            # A store holds one product type only, so a type with q items
            # needs ceil(q/x) stores; integer arithmetic avoids floats.
            return sum((q + x - 1) // x for q in quantities)

        # Feasibility is monotone in the cap x, so binary-search the smallest
        # feasible one. hi = max(quantities) is always feasible (one store
        # can take an entire product type).
        lo, hi = 1, max(quantities)
        # Invariant: lo possibly too small, hi known feasible; the sum check
        # uses <= n since leftover stores may receive nothing.
        while lo < hi:
            mid = (lo + hi) // 2
            if stores_needed(mid) <= n:
                hi = mid
            else:
                lo = mid + 1
        return lo
