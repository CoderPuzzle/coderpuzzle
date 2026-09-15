from typing import List


class Solution:
    def minMaxWaitingTime(self, demand: List[int], fuel: List[int]) -> int:
        # Sweep the cars level by level. A state is (fuel0, fuel1, busy0,
        # busy1): each dispenser's remaining fuel and its remaining busy
        # time measured from the moment the current car becomes allowed,
        # clamped at 0 once free. The value is the smallest maximum
        # waiting time achievable so far.
        states = {(fuel[0], fuel[1], 0, 0): 0}
        for i, d in enumerate(demand):
            nxt = {}
            for (f0, f1, r0, r1), worst in states.items():
                if f0 >= d:
                    # Serve car i on dispenser 0; it waits out r0 while the
                    # other dispenser's clock runs down by the same r0.
                    nmw = max(worst, r0)
                    key = (f0 - d, f1, d, max(r1 - r0, 0))
                    if key not in nxt or nxt[key] > nmw:
                        nxt[key] = nmw
                if f1 >= d:
                    nmw = max(worst, r1)
                    key = (f0, f1 - d, max(r0 - r1, 0), d)
                    if key not in nxt or nxt[key] > nmw:
                        nxt[key] = nmw
            if not nxt:
                # The process terminates here and no car may be skipped,
                # so every live state has served exactly i cars.
                return -1 if i == 0 else min(states.values())
            states = nxt
        return min(states.values())
