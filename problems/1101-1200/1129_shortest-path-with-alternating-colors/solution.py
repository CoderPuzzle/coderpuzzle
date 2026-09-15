from typing import List, Optional

from collections import deque


class Solution:
    def shortestAlternatingPaths(self, n: int, redEdges: List[List[int]], blueEdges: List[List[int]]) -> List[int]:
        adjacency = ([[] for _ in range(n)], [[] for _ in range(n)])
        for u, v in redEdges:
            adjacency[0][u].append(v)
        for u, v in blueEdges:
            adjacency[1][u].append(v)

        # State = (node, color of the edge used to enter it): the same node
        # can be worth visiting once per incoming color, so BFS runs over the
        # 2n states of this expanded graph.
        INF = float("inf")
        dist = [[INF, INF] for _ in range(n)]
        # Node 0 has no incoming edge: seed both colors at distance 0 so
        # whichever color the first real edge alternates from is covered.
        dist[0][0] = 0  # arrived at 0 via a red edge (virtual start)
        dist[0][1] = 0
        answer = [-1] * n
        answer[0] = 0
        queue = deque([(0, 0), (0, 1)])
        while queue:
            node, color = queue.popleft()
            # Only edges of the opposite color may leave this state.
            for nxt in adjacency[1 - color][node]:
                # INF doubles as the visited test: BFS first arrival is
                # already at minimum distance.
                if dist[nxt][1 - color] == INF:
                    dist[nxt][1 - color] = dist[node][color] + 1
                    value = dist[nxt][1 - color]
                    answer[nxt] = value if answer[nxt] == -1 else min(answer[nxt], value)
                    queue.append((nxt, 1 - color))
        return answer
