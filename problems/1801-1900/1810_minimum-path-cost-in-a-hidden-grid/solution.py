import heapq
from typing import List, Optional


class Solution:
    def findMinimumPath(self, master: GridMaster) -> int:
        deltas = {"U": (-1, 0), "D": (1, 0), "L": (0, -1), "R": (0, 1)}
        back = {"U": "D", "D": "U", "L": "R", "R": "L"}
        order = list(deltas.items())
        cost = {(0, 0): 0}
        found_target = (0, 0) if master.isTarget() else None

        # Iterative DFS keeps the robot physically on the DFS tree: move to a
        # child when pushing, move back when popping.
        stack = [[0, 0, None, 0]]
        while stack:
            frame = stack[-1]
            r, c, parent_dir, idx = frame
            pushed = False
            while idx < len(order):
                direction, (dr, dc) = order[idx]
                idx += 1
                nr, nc = r + dr, c + dc
                if master.canMove(direction) and (nr, nc) not in cost:
                    cost[(nr, nc)] = master.move(direction)
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
        import heapq

        dist = {(0, 0): 0}
        heap = [(0, 0, 0)]
        while heap:
            d, r, c = heapq.heappop(heap)
            if d > dist.get((r, c), float("inf")):
                continue
            for dr, dc in deltas.values():
                nr, nc = r + dr, c + dc
                if (nr, nc) in cost:
                    nd = d + cost[(nr, nc)]
                    if nd < dist.get((nr, nc), float("inf")):
                        dist[(nr, nc)] = nd
                        heapq.heappush(heap, (nd, nr, nc))
        return dist.get(found_target, -1)
