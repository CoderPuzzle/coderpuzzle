from typing import List


class Solution:
    def minCost(
        self,
        startPos: List[int],
        homePos: List[int],
        rowCosts: List[int],
        colCosts: List[int],
    ) -> int:
        total = 0
        row = startPos[0]
        while row != homePos[0]:
            row += 1 if row < homePos[0] else -1
            total += rowCosts[row]

        col = startPos[1]
        while col != homePos[1]:
            col += 1 if col < homePos[1] else -1
            total += colCosts[col]
        return total
