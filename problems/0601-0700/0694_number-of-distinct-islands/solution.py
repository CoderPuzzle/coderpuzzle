from typing import List, Set, Tuple


class Solution:
    def numDistinctIslands(self, grid: List[List[int]]) -> int:
        # Flood-fill each island with an explicit queue. The shape is the
        # sorted set of cells relative to the first cell the row-major scan
        # meets, so translated copies produce one identical signature.
        m, n = len(grid), len(grid[0])
        seen = [[False] * n for _ in range(m)]
        shapes: Set[Tuple[Tuple[int, int], ...]] = set()
        for i in range(m):
            for j in range(n):
                if grid[i][j] != 1 or seen[i][j]:
                    continue
                seen[i][j] = True
                queue: List[Tuple[int, int]] = [(i, j)]
                cells: List[Tuple[int, int]] = []
                head = 0
                while head < len(queue):
                    r, c = queue[head]
                    head += 1
                    cells.append((r - i, c - j))
                    for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                        if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1 and not seen[nr][nc]:
                            seen[nr][nc] = True
                            queue.append((nr, nc))
                shapes.add(tuple(sorted(cells)))
        return len(shapes)
