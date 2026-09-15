from typing import List, Optional


class Solution:
    def numberOfWays(self, numPeople: int) -> int:
        MOD = 10**9 + 7
        m = numPeople // 2
        # catalan[i] = non-crossing handshake layouts for i pairs; an empty
        # circle has exactly one layout, anchoring the recurrence.
        catalan = [0] * (m + 1)
        catalan[0] = 1
        for i in range(1, m + 1):
            total = 0
            # Fix person 1 and sum over their partner: the chord splits the
            # circle into two arcs filled independently (anything crossing
            # between arcs would cross the pivot chord). Partner j leaves
            # j pairs on one side and i-1-j on the other — the Catalan
            # recurrence catalan[i] = Σ catalan[j]·catalan[i-1-j].
            for j in range(i):
                total = (total + catalan[j] * catalan[i - 1 - j]) % MOD
            catalan[i] = total
        return catalan[m]
