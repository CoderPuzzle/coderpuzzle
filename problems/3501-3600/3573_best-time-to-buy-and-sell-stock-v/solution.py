from typing import List


class Solution:
    def maximumProfit(self, prices: List[int], k: int) -> int:
        # Per day, for each count t of completed transactions: done[t] =
        # flat, openLong[t] = holding a bought share, openShort[t] =
        # holding a shorted share. NEG marks impossible states.
        NEG = -(10**15)
        done = [NEG] * (k + 1)
        done[0] = 0
        open_long = [NEG] * (k + 1)
        open_short = [NEG] * (k + 1)
        for price in prices:
            # Closes today complete transaction t+1 from an open position.
            nd = done[:]
            for t in range(k):
                nd[t + 1] = max(done[t + 1], open_long[t] + price, open_short[t] - price)
            # Opens read done[t] from BEFORE today's closes: a close and
            # the next open can never share a day (and an open can never
            # close the same day, since closes read the old open row).
            nl = open_long[:]
            ns = open_short[:]
            for t in range(k + 1):
                nl[t] = max(nl[t], done[t] - price)
                ns[t] = max(ns[t], done[t] + price)
            done, open_long, open_short = nd, nl, ns
        return max(done)
