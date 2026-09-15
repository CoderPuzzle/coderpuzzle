from typing import List, Optional


class Solution:
    def countVisitedNodes(self, edges: List[int]) -> List[int]:
        n = len(edges)
        state = [0] * n  # 0 unvisited, 1 on the current path, 2 resolved
        ans = [0] * n

        for start in range(n):
            if state[start] == 2:
                continue
            path = []
            cur = start
            while state[cur] == 0:
                state[cur] = 1
                path.append(cur)
                cur = edges[cur]
            if state[cur] == 1:
                # A cycle was discovered; find its start inside path.
                cycle_start = path.index(cur)
                length = len(path) - cycle_start
                for node in path[cycle_start:]:
                    ans[node] = length
                    state[node] = 2
                for depth in range(cycle_start):
                    node = path[depth]
                    ans[node] = length + (cycle_start - depth)
                    state[node] = 2
            else:
                # path leads into an already-resolved component.
                base = ans[cur]
                for depth in range(len(path)):
                    node = path[depth]
                    ans[node] = base + (len(path) - depth)
                    state[node] = 2
        return ans
