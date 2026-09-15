from typing import List, Optional


class Solution:
    def maximumAND(self, nums: List[int], k: int, m: int) -> int:
        # Decide the answer mask bit by bit, highest bit first: a mask is
        # feasible when m elements can each be raised (total increments
        # within k) to a value carrying every mask bit, and feasibility is
        # downward closed, so a feasible higher bit is always worth taking.
        res = 0
        for b in range(30, -1, -1):
            cand = res | (1 << b)
            costs = []
            for num in nums:
                missing = cand & ~num
                if missing:
                    # With h the highest missing bit, the cheapest target
                    # >= num covering cand keeps num's bits above h, sets
                    # bit h, and fills cand's bits below h.
                    h = missing.bit_length() - 1
                    t = ((num >> (h + 1)) << (h + 1)) | (1 << h) | (cand & ((1 << h) - 1))
                    costs.append(t - num)
                else:
                    costs.append(0)
            # Raises on different indices are independent, so the m cheapest
            # per-element costs decide feasibility.
            costs.sort()
            if sum(costs[:m]) <= k:
                res = cand
        return res
