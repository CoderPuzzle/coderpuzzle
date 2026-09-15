from collections import deque


class Solution:
    def minKnightMoves(self, x: int, y: int) -> int:
        # Mirror symmetry folds every target into the first quadrant; a
        # knight never needs to leave the window two squares past it.
        tx, ty = abs(x), abs(y)
        moves = [(1, 2), (2, 1), (2, -1), (1, -2), (-1, -2), (-2, -1), (-2, 1), (-1, 2)]
        seen = {(0, 0)}
        queue = deque([(0, 0)])
        steps = 0
        while queue:
            for _ in range(len(queue)):
                cx, cy = queue.popleft()
                if cx == tx and cy == ty:
                    return steps
                for dx, dy in moves:
                    nx, ny = cx + dx, cy + dy
                    if -2 <= nx <= tx + 2 and -2 <= ny <= ty + 2 and (nx, ny) not in seen:
                        seen.add((nx, ny))
                        queue.append((nx, ny))
            steps += 1
        raise AssertionError("unreachable")
