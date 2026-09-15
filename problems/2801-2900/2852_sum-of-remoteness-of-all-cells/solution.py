from typing import List


class Solution:
    def sumRemoteness(self, grid: List[List[int]]) -> int:
        # One flood fill per unvisited non-blocked cell totals the size and
        # value of its component; a cell reaches exactly its own component,
        # so its remoteness is every other component's value, and summing
        # that over all cells collapses to size * (total - component_sum).
        rows, columns = len(grid), len(grid[0])
        visited = [[False] * columns for _ in range(rows)]
        total = 0
        components = []
        for start_r in range(rows):
            for start_c in range(columns):
                if grid[start_r][start_c] == -1 or visited[start_r][start_c]:
                    continue
                visited[start_r][start_c] = True
                stack = [(start_r, start_c)]
                size = 0
                values = 0
                while stack:
                    r, c = stack.pop()
                    size += 1
                    values += grid[r][c]
                    for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                        if 0 <= nr < rows and 0 <= nc < columns and grid[nr][nc] != -1 and not visited[nr][nc]:
                            visited[nr][nc] = True
                            stack.append((nr, nc))
                total += values
                components.append((size, values))
        return sum(size * (total - values) for size, values in components)
