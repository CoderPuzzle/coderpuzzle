from typing import List


class Solution:
    def calculateMinimumHP(self, dungeon: List[List[int]]) -> int:
        # need[j] is the least health that saves the knight from column j of
        # the row being folded; index n is a sentinel wall past the right edge.
        n = len(dungeon[0])
        need = [10**9] * (n + 1)
        need[n - 1] = 1
        for row in reversed(dungeon):
            for j in range(n - 1, -1, -1):
                # Scan right-to-left: need[j] is still the room below while
                # need[j + 1] is already this row, exactly the two moves.
                need[j] = max(1, min(need[j], need[j + 1]) - row[j])
        return need[0]
