from collections import deque
from typing import List


class Solution:
    def frogPosition(self, n: int, edges: List[List[int]], t: int, target: int) -> float:
        if n == 1:
            return 1.0
        neighbors = [[] for _ in range(n + 1)]
        for a, b in edges:
            neighbors[a].append(b)
            neighbors[b].append(a)

        # BFS from vertex 1; probability splits equally among unvisited
        # children. A leaf keeps its probability: the frog stays there.
        prob = [0.0] * (n + 1)
        depth = [0] * (n + 1)
        visited = [False] * (n + 1)
        child_count = [0] * (n + 1)
        queue = deque([1])
        prob[1] = 1.0
        visited[1] = True
        while queue:
            node = queue.popleft()
            children = [nxt for nxt in neighbors[node] if not visited[nxt]]
            child_count[node] = len(children)
            for child in children:
                visited[child] = True
                depth[child] = depth[node] + 1
                prob[child] = prob[node] / len(children)
                queue.append(child)

        if depth[target] == t:
            return prob[target]
        # The frog reached target earlier and got stuck there forever:
        # target must be a leaf of the rooted tree.
        if depth[target] < t and child_count[target] == 0:
            return prob[target]
        return 0.0
