from typing import List
from collections import deque


class Solution:
    def minPushBox(self, grid: List[List[str]]) -> int:
        m, n = len(grid), len(grid[0])
        for r in range(m):
            for c in range(n):
                if grid[r][c] == "B":
                    box = (r, c)
                elif grid[r][c] == "S":
                    player = (r, c)
                elif grid[r][c] == "T":
                    target = (r, c)

        def free(r, c):
            return 0 <= r < m and 0 <= c < n and grid[r][c] != "#"

        def reach(box_cell, start):
            """Cells the player can walk to with the box as an obstacle."""
            seen = {start}
            queue = deque([start])
            while queue:
                r, c = queue.popleft()
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nxt = (r + dr, c + dc)
                    if nxt != box_cell and free(*nxt) and nxt not in seen:
                        seen.add(nxt)
                        queue.append(nxt)
            return seen

        # State: (box cell, side of the player). After a push along deltas[i]
        # the player ends up standing on side i of the new box cell, so that
        # pair captures everything future reachability depends on. Each edge
        # is one push, so BFS yields minimal pushes.
        deltas = [(0, -1), (0, 1), (-1, 0), (1, 0)]
        visited = set()
        queue = deque()
        around = reach(box, player)
        for i, (dr, dc) in enumerate(deltas):
            stand = (box[0] + dr, box[1] + dc)
            dest = (box[0] - dr, box[1] - dc)
            if free(*stand) and free(*dest) and stand in around:
                visited.add((dest, i))
                queue.append((dest, i, 1))
        while queue:
            bcell, side, pushes = queue.popleft()
            if bcell == target:
                return pushes
            dr, dc = deltas[side]
            here = (bcell[0] + dr, bcell[1] + dc)
            around = reach(bcell, here)
            for i, (dr, dc) in enumerate(deltas):
                stand = (bcell[0] + dr, bcell[1] + dc)
                dest = (bcell[0] - dr, bcell[1] - dc)
                if not free(*stand) or not free(*dest) or stand not in around:
                    continue
                if (dest, i) in visited:
                    continue
                visited.add((dest, i))
                queue.append((dest, i, pushes + 1))
        return -1
