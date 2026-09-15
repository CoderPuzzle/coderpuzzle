from typing import List, Set, Tuple


class Solution:
    def numDistinctIslands2(self, grid: List[List[int]]) -> int:
        # Flood-fill each island with an explicit stack, then name the shape by
        # the lexicographically smallest normalized cell list among its eight
        # rotations and reflections: two islands share a name exactly when one
        # maps onto the other under the statement's rule.
        m, n = len(grid), len(grid[0])
        seen = [[False] * n for _ in range(m)]
        shapes: Set[Tuple[Tuple[int, int], ...]] = set()
        for i in range(m):
            for j in range(n):
                if grid[i][j] != 1 or seen[i][j]:
                    continue
                seen[i][j] = True
                stack: List[Tuple[int, int]] = [(i, j)]
                cells: List[Tuple[int, int]] = []
                while stack:
                    r, c = stack.pop()
                    cells.append((r, c))
                    for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                        if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1 and not seen[nr][nc]:
                            seen[nr][nc] = True
                            stack.append((nr, nc))
                signs = (1, -1)
                best: Tuple[Tuple[int, int], ...] = ()
                for t in range(8):
                    a, b, swap = signs[t & 1], signs[(t >> 1) & 1], t & 4 != 0
                    moved = [(a * (c if swap else r), b * (r if swap else c)) for r, c in cells]
                    r0 = min(row for row, _ in moved)
                    c0 = min(col for _, col in moved)
                    shape = tuple(sorted((row - r0, col - c0) for row, col in moved))
                    if not best or shape < best:
                        best = shape
                shapes.add(best)
        return len(shapes)
