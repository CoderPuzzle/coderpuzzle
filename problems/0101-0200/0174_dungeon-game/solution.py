from typing import List, Optional


class Solution:
    def calculateMinimumHP(self, dungeon: List[List[int]]) -> int:
        m = len(dungeon)
        n = len(dungeon[0])
        INF = float("inf")
        # need[i][j]: smallest health needed when ENTERING (i, j) so some
        # right/down path survives to the princess. An INF border keeps
        # out-of-bounds neighbors from ever being chosen.
        need = [[INF] * (n + 1) for _ in range(m + 1)]
        # Seed: leaving the bottom-right room requires at least 1 health.
        need[m][n - 1] = 1
        # Fill bottom-to-top, right-to-left so both onward values are final.
        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                # Take the cheaper onward room, pay this room's effect.
                best_next = min(need[i + 1][j], need[i][j + 1])
                # Health must stay at least 1 — 0 or below is fatal.
                need[i][j] = max(1, best_next - dungeon[i][j])
        return need[0][0]
