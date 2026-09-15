from typing import List


class Solution:
    def interactionCosts(self, n: int, edges: List[List[int]], group: List[int]) -> int:
        # One slot per group label; labels are 1..20.
        labels = 21

        adjacency = [[] for _ in range(n)]
        for u, v in edges:
            adjacency[u].append(v)
            adjacency[v].append(u)

        total = [0] * labels
        for label in group:
            total[label] += 1

        # Breadth-first discovery from node 0 records each node's parent;
        # an explicit queue keeps deep trees off the call stack.
        parent = [-1] * n
        order = [0]
        for node in order:
            for neighbor in adjacency[node]:
                if neighbor != parent[node]:
                    parent[neighbor] = node
                    order.append(neighbor)

        # counts[node][label] = same-label nodes inside node's subtree.
        # Reverse discovery order visits children before parents, so each
        # vector is complete when its node's turn comes.
        counts = [[0] * labels for _ in range(n)]
        answer = 0
        for node in reversed(order[1:]):
            subtree = counts[node]
            subtree[group[node]] += 1
            above = counts[parent[node]]
            for label in range(1, labels):
                inside = subtree[label]
                if inside:
                    # Every same-group pair split by the parent edge pays
                    # exactly one unit on this edge.
                    answer += inside * (total[label] - inside)
                    above[label] += inside
        return answer
