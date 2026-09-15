from typing import List


class Solution:
    def prisonAfterNDays(self, cells: List[int], n: int) -> List[int]:
        # Eight two-state cells admit at most 256 rows, and day one vacates
        # both end cells, leaving 64 — the deterministic daily map must
        # loop. Hash each row to its first day; when the row reappears on
        # day `day` after first being seen on day `first`, the future
        # repeats that day - first cycle, so only (n - day) % cycle
        # further transitions remain.
        def next_day(state):
            return [0] + [1 if state[i - 1] == state[i + 1] else 0 for i in range(1, 7)] + [0]

        state = tuple(cells)
        seen = {}
        day = 0
        while day < n and state not in seen:
            seen[state] = day
            state = tuple(next_day(state))
            day += 1
        if day < n:
            cycle = day - seen[state]
            for _ in range((n - day) % cycle):
                state = tuple(next_day(state))
        return list(state)
