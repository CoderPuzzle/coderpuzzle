from typing import List, Optional


class Solution:
    def longestCycle(self, edges: List[int]) -> int:
        n = len(edges)
        # Three colors: 0 = unvisited, 1 = on the current walk, 2 = finished.
        color = [0] * n
        step = [0] * n
        timer = 1
        best = -1
        for start in range(n):
            if color[start]:
                continue
            node = start
            path = []
            # Out-degree <= 1 means rho shapes: walk until dead-end (-1),
            # a finished node, or a node on the current walk (a cycle).
            while node != -1 and color[node] == 0:
                color[node] = 1
                step[node] = timer
                timer += 1
                path.append(node)
                node = edges[node]
            # Landing on color 1 means we looped back into this walk; the
            # cycle length is the steps taken since that node was stamped.
            if node != -1 and color[node] == 1:
                best = max(best, timer - step[node])
            # Mark the whole walk finished so later starts never re-walk it.
            for v in path:
                color[v] = 2
        return best
