from typing import List


class Solution:
    def matrixScore(self, grid: List[List[int]]) -> int:
        m = len(grid)
        n = len(grid[0])
        # A leading 1 outweighs the rest of its row combined, so every row
        # is flipped to a 1 head and contributes 2^(n-1) up front.
        score = m << (n - 1)
        for j in range(1, n):
            # After the head pass, cell (i, j) is 1 exactly where the row
            # agreed with its own head, so a toggle trades k for m - k.
            agree = sum(1 for row in grid if row[j] == row[0])
            score += max(agree, m - agree) << (n - 1 - j)
        return score
