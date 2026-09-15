from collections import deque
from typing import Deque


class Solution:
    def predictPartyVictory(self, senate: str) -> str:
        # Two queues of senator indices, filled in string order: the fronts
        # are the earliest still-living senator of each party in the current
        # wrap-around pass.
        n = len(senate)
        radiant: Deque[int] = deque()
        dire: Deque[int] = deque()
        for i, party in enumerate(senate):
            (radiant if party == "R" else dire).append(i)
        # Each step the two fronts fight: the smaller index acts first, bans
        # the loser (popped for good), and re-enqueues itself at index + n,
        # its position in the next round's pass. Every fight removes one
        # senator permanently, so at most n - 1 fights decide the senate.
        while radiant and dire:
            r = radiant.popleft()
            d = dire.popleft()
            if r < d:
                radiant.append(r + n)
            else:
                dire.append(d + n)
        return "Radiant" if radiant else "Dire"
