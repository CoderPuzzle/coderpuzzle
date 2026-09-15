from typing import List


class Solution:
    def minimumOperationsToWriteY(self, grid: List[List[int]]) -> int:
        n = len(grid)
        mid = n // 2
        y_count = [0, 0, 0]
        other_count = [0, 0, 0]
        for r in range(n):
            for c in range(n):
                on_y = (r == c and r <= mid) or (c == n - 1 - r and r <= mid) or (c == mid and r >= mid)
                if on_y:
                    y_count[grid[r][c]] += 1
                else:
                    other_count[grid[r][c]] += 1
        best = n * n
        for y_value in range(3):
            for other_value in range(3):
                if y_value == other_value:
                    continue
                cost = 0
                for value in range(3):
                    if value != y_value:
                        cost += y_count[value]
                    if value != other_value:
                        cost += other_count[value]
                best = min(best, cost)
        return best
