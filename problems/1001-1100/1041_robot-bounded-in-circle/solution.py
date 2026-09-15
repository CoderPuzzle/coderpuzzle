from typing import List, Optional


class Solution:
    def isRobotBounded(self, instructions: str) -> bool:
        # simulate one pass from the origin facing north; L/R rotate the
        # heading a quarter turn via (dx, dy) -> (-dy, dx) / (dy, -dx)
        x, y = 0, 0
        dx, dy = 0, 1  # north
        for ch in instructions:
            if ch == "G":
                x += dx
                y += dy
            elif ch == "L":
                dx, dy = -dy, dx
            else:  # 'R'
                dx, dy = dy, -dx
        # at the origin: each pass is a closed loop. Turned at all: every
        # repetition's displacement is the previous one rotated by a fixed
        # quarter turn, so at most four copies cancel back to the start.
        # Facing north while displaced repeats the same drift — the one
        # unbounded case.
        return (x, y) == (0, 0) or (dx, dy) != (0, 1)
