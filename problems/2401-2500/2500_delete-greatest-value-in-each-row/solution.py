from typing import List


class Solution:
    def deleteGreatestValue(self, grid: List[List[int]]) -> int:
        # Sorting each row descending settles in one shot what every round
        # would delete from it: round k takes each row's k-th largest value.
        # The round's contribution is then just the max over rows of that
        # k-th largest -- no heap or marking simulation needed.
        rows = [sorted(row, reverse=True) for row in grid]
        return sum(max(row[j] for row in rows) for j in range(len(rows[0])))
