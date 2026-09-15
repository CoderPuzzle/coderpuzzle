from typing import List


class Solution:
    def isPrintable(self, targetGrid: List[List[int]]) -> bool:
        rows = len(targetGrid)
        cols = len(targetGrid[0])

        # Each color's bounding rectangle: the smallest axis-aligned box that
        # covers every cell holding that color in the target grid.
        min_row: dict = {}
        max_row: dict = {}
        min_col: dict = {}
        max_col: dict = {}
        for r in range(rows):
            for c in range(cols):
                color = targetGrid[r][c]
                if color not in min_row:
                    min_row[color] = max_row[color] = r
                    min_col[color] = max_col[color] = c
                else:
                    if r < min_row[color]:
                        min_row[color] = r
                    if r > max_row[color]:
                        max_row[color] = r
                    if c < min_col[color]:
                        min_col[color] = c
                    if c > max_col[color]:
                        max_col[color] = c

        # An edge color -> other means color's bounding box shows `other`
        # somewhere inside it, so color must be stamped before `other`.
        colors = list(min_row.keys())
        adjacency = {color: set() for color in colors}
        for color in colors:
            for r in range(min_row[color], max_row[color] + 1):
                for c in range(min_col[color], max_col[color] + 1):
                    other = targetGrid[r][c]
                    if other != color:
                        adjacency[color].add(other)

        # A valid stamp order exists iff this dependency graph has no cycle.
        WHITE, GRAY, BLACK = 0, 1, 2
        state = {color: WHITE for color in colors}

        def has_cycle(node: int) -> bool:
            state[node] = GRAY
            for neighbor in adjacency[node]:
                if state[neighbor] == GRAY:
                    return True
                if state[neighbor] == WHITE and has_cycle(neighbor):
                    return True
            state[node] = BLACK
            return False

        for color in colors:
            if state[color] == WHITE and has_cycle(color):
                return False
        return True
