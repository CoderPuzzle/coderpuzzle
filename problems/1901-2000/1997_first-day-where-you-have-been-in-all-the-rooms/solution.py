from typing import List, Optional


class Solution:
    def firstDayBeenInAllRooms(self, nextVisit: List[int]) -> int:
        MOD = 10**9 + 7
        n = len(nextVisit)
        # f[i] = day room i is first visited; f[0] = 0 anchors the
        # recurrence (room 0 is entered on day 0).
        f = [0] * n
        for i in range(1, n):
            # Thrown from i-1 back to j = nextVisit[i-1], rooms 0..i-2 are
            # all even again — the exact state of day f[j]+1 — so the
            # deterministic replay costs f[i-1]-f[j]-1 days; add the first
            # visit of i-1 and the step into i for 2*f[i-1] - f[j] + 2.
            f[i] = (2 * f[i - 1] - f[nextVisit[i - 1]] + 2) % MOD
        return f[n - 1] % MOD
