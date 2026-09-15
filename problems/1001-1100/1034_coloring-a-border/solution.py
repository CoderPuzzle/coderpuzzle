from typing import List, Tuple


class Solution:
    def colorBorder(self, grid: List[List[int]], row: int, col: int, color: int) -> List[List[int]]:
        # Identify the whole connected component first (BFS with an
        # explicit queue — depth safety), classifying each member's
        # border status against the ORIGINAL grid values. Only after
        # every member has been classified does a second pass repaint
        # the collected border cells, so an in-progress repaint can
        # never corrupt a later cell's neighbor check.
        m, n = len(grid), len(grid[0])
        original = grid[row][col]
        visited = [[False] * n for _ in range(m)]
        visited[row][col] = True
        queue: List[Tuple[int, int]] = [(row, col)]
        head = 0
        border: List[Tuple[int, int]] = []
        while head < len(queue):
            r, c = queue[head]
            head += 1
            is_border = r == 0 or r == m - 1 or c == 0 or c == n - 1
            for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                if 0 <= nr < m and 0 <= nc < n:
                    if grid[nr][nc] != original:
                        is_border = True
                    elif not visited[nr][nc]:
                        visited[nr][nc] = True
                        queue.append((nr, nc))
            if is_border:
                border.append((r, c))
        for r, c in border:
            grid[r][c] = color
        return grid
