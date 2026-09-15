from typing import List, Optional


class Solution:
    def leadsToDestination(self, n: int, edges: List[List[int]], source: int, destination: int) -> bool:
        graph = [[] for _ in range(n)]
        for u, v in edges:
            graph[u].append(v)

        # 0 = unvisited (white), 1 = on the current DFS path (gray), 2 = fully
        # verified safe (black). A node is a leaf when it has no outgoing
        # edges; a leaf is safe only if it is the destination. The
        # destination itself must also be a true leaf -- if it has outgoing
        # edges, any path through it keeps going and can only end somewhere
        # else (or loop forever), so it is unsafe the moment it is reached.
        state = [0] * n

        def leaf_verdict(node: int) -> Optional[bool]:
            if not graph[node]:
                return node == destination
            if node == destination:
                return False
            return None  # not decidable yet -- needs a full DFS expansion

        verdict = leaf_verdict(source)
        if verdict is not None:
            return verdict

        # Explicit stack of [node, next child index] frames -- an iterative
        # post-order DFS so the recursion depth never depends on graph depth.
        state[source] = 1
        stack = [[source, 0]]
        while stack:
            node, idx = stack[-1]
            if idx == len(graph[node]):
                state[node] = 2
                stack.pop()
                continue
            stack[-1][1] += 1
            neighbor = graph[node][idx]
            if state[neighbor] == 1:
                return False  # back edge to a node on the current path: a cycle
            if state[neighbor] == 2:
                continue  # already proven safe on an earlier branch
            verdict = leaf_verdict(neighbor)
            if verdict is False:
                return False
            if verdict is True:
                state[neighbor] = 2
                continue
            state[neighbor] = 1
            stack.append([neighbor, 0])
        return True
