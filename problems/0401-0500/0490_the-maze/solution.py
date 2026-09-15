from collections import deque
from typing import List


class Solution:
    def hasPath(self, maze: List[List[int]], start: List[int], destination: List[int]) -> bool:
        rows, cols = len(maze), len(maze[0])
        target = (destination[0], destination[1])
        # The ball begins at rest, so the start cell is itself a stopping
        # position and seeds the queue.
        queue = deque([(start[0], start[1])])
        stopped = {(start[0], start[1])}
        while queue:
            row, col = queue.popleft()
            if (row, col) == target:
                return True
            # A roll is deterministic: the ball travels in one direction
            # until the next cell would leave the grid or enter a wall, and
            # wherever it comes to rest is the only successor that counts.
            for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
                r, c = row, col
                while 0 <= r + dr < rows and 0 <= c + dc < cols and maze[r + dr][c + dc] == 0:
                    r += dr
                    c += dc
                if (r, c) not in stopped:
                    stopped.add((r, c))
                    queue.append((r, c))
        return False
