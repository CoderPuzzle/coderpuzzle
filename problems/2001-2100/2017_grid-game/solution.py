from typing import List


class Solution:
    def gridGame(self, grid: List[List[int]]) -> int:
        top_remaining = sum(grid[0])
        bottom_prefix = 0
        answer = float("inf")
        for column in range(len(grid[0])):
            top_remaining -= grid[0][column]
            answer = min(answer, max(top_remaining, bottom_prefix))
            bottom_prefix += grid[1][column]
        return int(answer)
