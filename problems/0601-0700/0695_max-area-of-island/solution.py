from typing import List, Tuple


class Solution:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        # Sweep row-major: every island is discovered exactly once, at the
        # first cell the scan meets, and counted by flooding it with an
        # explicit queue. Iterating rather than recursing is the point — a
        # snake-shaped island at the bound chains thousands of cells deep,
        # far past any call stack the runtimes grant a submission.
        m, n = len(grid), len(grid[0])
        seen = [[False] * n for _ in range(m)]
        best = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] != 1 or seen[i][j]:
                    continue
                seen[i][j] = True
                queue: List[Tuple[int, int]] = [(i, j)]
                area = 0
                head = 0
                # A cell is marked when it enters the queue, never when it
                # leaves, so no cell is ever enqueued twice.
                while head < len(queue):
                    r, c = queue[head]
                    head += 1
                    area += 1
                    for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                        if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1 and not seen[nr][nc]:
                            seen[nr][nc] = True
                            queue.append((nr, nc))
                best = max(best, area)
        return best
