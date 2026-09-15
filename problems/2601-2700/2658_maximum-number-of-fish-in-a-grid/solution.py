from typing import List


class Solution:
    def findMaxFish(self, grid: List[List[int]]) -> int:
        # Every unvisited water cell seeds one flood fill that totals the
        # fish of its connected component; the best component total wins.
        rows, columns = len(grid), len(grid[0])
        visited = [[False] * columns for _ in range(rows)]
        best = 0
        for start_r in range(rows):
            for start_c in range(columns):
                if grid[start_r][start_c] == 0 or visited[start_r][start_c]:
                    continue
                visited[start_r][start_c] = True
                stack = [(start_r, start_c)]
                total = 0
                while stack:
                    r, c = stack.pop()
                    total += grid[r][c]
                    for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                        if 0 <= nr < rows and 0 <= nc < columns and grid[nr][nc] > 0 and not visited[nr][nc]:
                            visited[nr][nc] = True
                            stack.append((nr, nc))
                best = max(best, total)
        return best
