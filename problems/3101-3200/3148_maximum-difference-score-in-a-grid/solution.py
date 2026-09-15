from typing import List


class Solution:
    def maxScore(self, grid: List[List[int]]) -> int:
        # Scores telescope: however many intermediate hops a journey
        # takes, its total is simply end - start. So only the endpoint
        # pair matters, and the end must sit strictly below or to the
        # right of the start (componentwise). A row-major sweep carries
        # prefix_min[r][c], the smallest value in the rectangle on or
        # above-left of (r, c); strip the cell itself from that
        # rectangle and what remains is exactly its legal start set,
        # split as "row above" plus "running minimum to the left".
        # Answers stay within ±(10⁵ − 1), comfortably inside any width.
        m, n = len(grid), len(grid[0])
        prefix_min = [[0] * n for _ in range(m)]
        big = 10**18
        best = -big
        for r in range(m):
            row_running = big
            for c in range(n):
                above = prefix_min[r - 1][c] if r > 0 else big
                start_val = min(above, row_running)
                best = max(best, grid[r][c] - start_val)
                row_running = min(row_running, grid[r][c])
                prefix_min[r][c] = min(start_val, grid[r][c])
        return best
