from collections import deque
from typing import List


class Solution:
    def highestRankedKItems(
        self, grid: List[List[int]], pricing: List[int], start: List[int], k: int
    ) -> List[List[int]]:
        rows, columns = len(grid), len(grid[0])
        distance = [[-1] * columns for _ in range(rows)]
        distance[start[0]][start[1]] = 0
        queue = deque([(start[0], start[1])])
        candidates = []
        while queue:
            row, column = queue.popleft()
            price = grid[row][column]
            if pricing[0] <= price <= pricing[1]:
                candidates.append((distance[row][column], price, row, column))
            for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
                nr, nc = row + dr, column + dc
                if 0 <= nr < rows and 0 <= nc < columns and grid[nr][nc] > 0 and distance[nr][nc] == -1:
                    distance[nr][nc] = distance[row][column] + 1
                    queue.append((nr, nc))

        candidates.sort()
        return [[row, column] for _, _, row, column in candidates[:k]]
