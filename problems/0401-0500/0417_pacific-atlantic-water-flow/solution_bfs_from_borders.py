from collections import deque
from typing import List, Optional


class Solution:
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        m, n = len(heights), len(heights[0])

        # Reverse the flow: walk inland from the ocean border instead of
        # downhill from every cell, so one traversal finds all draining cells.
        def reachable(border):
            seen = set(border)
            queue = deque(border)
            while queue:
                r, c = queue.popleft()
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nr, nc = r + dr, c + dc
                    # Only a neighbor at least as tall could have flowed down
                    # into (r, c).
                    if 0 <= nr < m and 0 <= nc < n and (nr, nc) not in seen and heights[nr][nc] >= heights[r][c]:
                        # Mark on enqueue so each cell enters the queue at
                        # most once.
                        seen.add((nr, nc))
                        queue.append((nr, nc))
            return seen

        # Pacific is seeded from the top row and left column, Atlantic from
        # the bottom row and right column; corners belong to both seed lists.
        pacific = reachable([(0, c) for c in range(n)] + [(r, 0) for r in range(m)])
        atlantic = reachable([(m - 1, c) for c in range(n)] + [(r, n - 1) for r in range(m)])
        # The row-major scan outputs the intersection already sorted.
        return [[r, c] for r in range(m) for c in range(n) if (r, c) in pacific and (r, c) in atlantic]
