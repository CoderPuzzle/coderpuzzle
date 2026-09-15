from typing import List


class Solution:
    def spiralMatrixIII(self, rows: int, cols: int, rStart: int, cStart: int) -> List[List[int]]:
        # The walk is a turtle: it runs east, south, west, north, east, ...
        # in turn, and every second turn the straight runs grow by one step
        # (1, 1, 2, 2, 3, 3, ...). A step that lands outside the grid is
        # still taken — the spiral reaches the far cells only by leaving
        # and re-entering — but only in-grid positions are recorded, and
        # once rows * cols of them are, the whole grid is visited and the
        # walk stops.
        total = rows * cols
        order: List[List[int]] = [[rStart, cStart]]
        directions = ((0, 1), (1, 0), (0, -1), (-1, 0))  # E, S, W, N
        r, c = rStart, cStart
        d = 0
        step = 1
        while len(order) < total:
            for _ in range(2):
                dr, dc = directions[d]
                for _ in range(step):
                    r += dr
                    c += dc
                    if 0 <= r < rows and 0 <= c < cols:
                        order.append([r, c])
                d = (d + 1) % 4
            step += 1
        return order
