from collections import deque
from typing import List, Optional


class Solution:
    def findShortestPath(self, master: GridMaster) -> int:
        deltas = {"U": (-1, 0), "D": (1, 0), "L": (0, -1), "R": (0, 1)}
        back = {"U": "D", "D": "U", "L": "R", "R": "L"}
        order = list(deltas.items())
        seen = {(0, 0)}
        found_target = (0, 0) if master.isTarget() else None

        # Iterative DFS keeps the robot physically on the DFS tree: move to a
        # child when pushing, move back when popping. Each reachable cell is
        # entered exactly once and probed with isTarget().
        stack = [[0, 0, None, 0]]
        while stack:
            frame = stack[-1]
            r, c, parent_dir, idx = frame
            pushed = False
            while idx < len(order):
                direction, (dr, dc) = order[idx]
                idx += 1
                nr, nc = r + dr, c + dc
                if master.canMove(direction) and (nr, nc) not in seen:
                    master.move(direction)
                    seen.add((nr, nc))
                    if master.isTarget():
                        found_target = (nr, nc)
                    frame[3] = idx
                    stack.append([nr, nc, direction, 0])
                    pushed = True
                    break
            if not pushed:
                stack.pop()
                if stack and parent_dir is not None:
                    master.move(back[parent_dir])

        if found_target is None:
            return -1

        # Unit edge weights: plain BFS over the discovered map.
        dist = {(0, 0): 0}
        queue = deque([(0, 0)])
        while queue:
            r, c = queue.popleft()
            for dr, dc in deltas.values():
                nr, nc = r + dr, c + dc
                if (nr, nc) in seen and (nr, nc) not in dist:
                    dist[(nr, nc)] = dist[(r, c)] + 1
                    queue.append((nr, nc))
        return dist[found_target]
