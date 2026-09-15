from typing import List, Tuple


class Solution:
    def shortestBridge(self, grid: List[List[int]]) -> int:
        # Scan row-major for the first island and flood it iteratively to
        # collect its cells; then grow a multi-source BFS outward over the
        # water, one layer per flipped 0, until the second island is
        # touched. Iterating rather than recursing is the point — an island
        # can snake through most of a 100 x 100 grid, chaining thousands of
        # cells deep, far past any call stack a runtime grants a submission.
        n = len(grid)
        seen = [[False] * n for _ in range(n)]
        start = None
        for i in range(n):
            for j in range(n):
                if grid[i][j] == 1:
                    start = (i, j)
                    break
            if start:
                break
        seen[start[0]][start[1]] = True
        frontier: List[Tuple[int, int]] = [start]
        head = 0
        # A cell is marked when it enters the frontier, never when it
        # leaves, so no cell is ever enqueued twice.
        while head < len(frontier):
            r, c = frontier[head]
            head += 1
            for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 1 and not seen[nr][nc]:
                    seen[nr][nc] = True
                    frontier.append((nr, nc))
        # Each BFS layer is exactly the set of water cells one more flip
        # away from island 1; the first unvisited land met is island 2.
        flips = 0
        while frontier:
            nxt: List[Tuple[int, int]] = []
            for r, c in frontier:
                for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                    if not (0 <= nr < n and 0 <= nc < n) or seen[nr][nc]:
                        continue
                    if grid[nr][nc] == 1:
                        return flips
                    seen[nr][nc] = True
                    nxt.append((nr, nc))
            frontier = nxt
            flips += 1
        return flips
