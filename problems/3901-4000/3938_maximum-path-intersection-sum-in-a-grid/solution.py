from typing import List


class Solution:
    def maxScore(self, grid: List[List[int]]) -> int:
        answer = -(10**18)

        def scan(values):
            nonlocal answer
            ending = values[0]
            for value in values[1:]:
                candidate = ending + value
                answer = max(answer, candidate)
                ending = max(value, candidate)

        for row in grid:
            scan(row)
        for column in range(len(grid[0])):
            scan([grid[row][column] for row in range(len(grid))])
        for row in range(1, len(grid) - 1):
            for column in range(1, len(grid[0]) - 1):
                answer = max(answer, grid[row][column])
        return answer
