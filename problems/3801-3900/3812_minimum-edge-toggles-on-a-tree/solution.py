from typing import List


class Solution:
    def minimumFlips(self, n: int, edges: List[List[int]], start: str, target: str) -> List[int]:
        adjacency = [[] for _ in range(n)]
        for index, (u, v) in enumerate(edges):
            adjacency[u].append((v, index))
            adjacency[v].append((u, index))

        # Breadth-first discovery from node 0 records each node's parent
        # and the edge leading to it; an explicit queue keeps deep trees
        # off the call stack.
        parent = [-1] * n
        parent_edge = [-1] * n
        order = [0]
        for node in order:
            for neighbor, edge in adjacency[node]:
                if neighbor != parent[node]:
                    parent[neighbor] = node
                    parent_edge[neighbor] = edge
                    order.append(neighbor)

        # need[node] stays 1 while the node's flip parity is unmatched.
        need = [1 if a != b else 0 for a, b in zip(start, target)]
        take = [False] * (n - 1)
        for node in reversed(order[1:]):
            if need[node]:
                # Children are done, so the parent edge is the only
                # remaining toggle touching this node: the choice is
                # forced, and the unmatched parity moves to the parent.
                take[parent_edge[node]] = True
                need[parent[node]] ^= 1
        # Whatever parity survives at the root cannot be fixed anywhere.
        if need[0]:
            return [-1]
        # A final ascending scan emits the chosen indices in order.
        return [index for index, chosen in enumerate(take) if chosen]
