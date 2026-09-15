from typing import List


class Solution:
    def countIslands(self, grid: List[List[int]], k: int) -> int:
        m, n = len(grid), len(grid[0])
        seen = [[False] * n for _ in range(m)]
        count = 0
        # Iterative BFS: an island can span all 1e5 cells, so no recursion.
        for si in range(m):
            for sj in range(n):
                if grid[si][sj] == 0 or seen[si][sj]:
                    continue
                # Flood-fill one island; its total reaches at most
                # 1e5 cells * 1e6 = 1e11, so the sum must not sit in a
                # 32-bit slot.
                total = 0
                queue = [(si, sj)]
                seen[si][sj] = True
                head = 0
                while head < len(queue):
                    x, y = queue[head]
                    head += 1
                    total += grid[x][y]
                    for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                        if 0 <= nx < m and 0 <= ny < n and grid[nx][ny] > 0 and not seen[nx][ny]:
                            seen[nx][ny] = True
                            queue.append((nx, ny))
                if total % k == 0:
                    count += 1
        return count
