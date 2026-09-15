from collections import deque
from typing import List


class Solution:
    def cutOffTree(self, forest: List[List[int]]) -> int:
        # The order is not a choice: the trees must fall shortest to tallest.
        # What is left to plan is only the walk between consecutive trees,
        # and each of those legs is an unweighted shortest path — a plain
        # BFS. Cutting a tree rewrites its cell to 1, which is still
        # walkable, so every leg can search the original forest unchanged.
        trees = sorted(
            (height, row, col) for row, line in enumerate(forest) for col, height in enumerate(line) if height > 1
        )
        total = 0
        row = col = 0
        for _, target_row, target_col in trees:
            steps = self._walk(forest, row, col, target_row, target_col)
            if steps < 0:
                return -1
            total += steps
            row, col = target_row, target_col
        return total

    def _walk(self, forest, row, col, target_row, target_col):
        # A wall under the walker means the leg never begins; only the
        # initial (0, 0) can actually be a 0 cell.
        if forest[row][col] == 0:
            return -1
        if row == target_row and col == target_col:
            return 0
        rows, cols = len(forest), len(forest[0])
        distance = [[-1] * cols for _ in range(rows)]
        distance[row][col] = 0
        pending = deque([(row, col)])
        while pending:
            here_row, here_col = pending.popleft()
            near = distance[here_row][here_col] + 1
            for r, c in (
                (here_row - 1, here_col),
                (here_row + 1, here_col),
                (here_row, here_col - 1),
                (here_row, here_col + 1),
            ):
                # Trees and empty cells are both walkable; only 0 is not.
                if 0 <= r < rows and 0 <= c < cols and forest[r][c] != 0 and distance[r][c] < 0:
                    if r == target_row and c == target_col:
                        return near
                    distance[r][c] = near
                    pending.append((r, c))
        return -1
