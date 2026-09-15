from itertools import accumulate
from typing import List


class Solution:
    def numberOfStableArrays(self, zero: int, one: int, limit: int) -> int:
        # Bottom-up block DP: dp[z][o][d] counts stable arrays using z zeros
        # and o ones that end with digit d. Appending one whole block of the
        # opposite digit (1..limit elements) means each transition sums a
        # window of `limit` cells along one axis, so rolling window totals
        # keep the whole pass linear in zero * one.
        MOD = 10**9 + 7
        w = one + 1
        vert = [0] * w  # windowed column sums of ending-in-1 cells
        prev_ones = [0] * w
        history = []  # past rows' ending-in-1 cells, kept for eviction
        answer = 0
        for z in range(zero + 1):
            vert = [v + p for v, p in zip(vert, prev_ones)]
            drop = z - 1 - limit
            if drop >= 0:
                vert = [v - g for v, g in zip(vert, history[drop])]
            # Ending in 0: the all-zeros prefix base at o == 0, then the
            # vertical window; ending in 1 mirrors it along the row.
            cur_zeros = [(1 if 1 <= z <= limit else 0)] + [v % MOD for v in vert[1:]]
            prefix = list(accumulate(cur_zeros))
            cur_ones = [0] * w
            cur_ones[1:] = [(prefix[o - 1] - (prefix[o - 1 - limit] if o > limit else 0)) % MOD for o in range(1, w)]
            if z == 0:
                # Row z == 0 holds the all-ones prefixes themselves.
                cur_ones[1:] = [1 if o <= limit else 0 for o in range(1, w)]
            answer = (cur_zeros[one] + cur_ones[one]) % MOD
            if z < zero:
                history.append(cur_ones)
            prev_ones = cur_ones
        return answer
