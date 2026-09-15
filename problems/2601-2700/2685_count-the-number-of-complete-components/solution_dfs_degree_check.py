from typing import List


class Solution:
    def countCompleteComponents(self, n: int, edges: List[List[int]]) -> int:
        # Both directions per edge: the graph is undirected, so each
        # endpoint must list the other among its neighbors.
        adjacency = [[] for _ in range(n)]
        for a, b in edges:
            adjacency[a].append(b)
            adjacency[b].append(a)

        visited = [False] * n
        complete = 0
        for start in range(n):
            if visited[start]:
                continue
            # An unclaimed vertex opens a fresh component; one flood
            # collects exactly that component and nothing else.
            visited[start] = True
            stack = [start]
            component = []
            while stack:
                node = stack.pop()
                component.append(node)
                for other in adjacency[node]:
                    if not visited[other]:
                        # Mark at push time so no vertex is stacked twice.
                        visited[other] = True
                        stack.append(other)
            # A component of k vertices is fully wired exactly when every
            # member is adjacent to all k - 1 others.
            k = len(component)
            if all(len(adjacency[node]) == k - 1 for node in component):
                complete += 1
        return complete
