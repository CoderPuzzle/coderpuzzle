from typing import List, Optional


class Solution:
    def possibleBipartition(self, n: int, dislikes: List[List[int]]) -> bool:
        # Dislike is symmetric, so build an undirected adjacency list: a
        # valid two-group split is exactly a 2-coloring of this graph.
        adjacency = [[] for _ in range(n + 1)]
        for a, b in dislikes:
            adjacency[a].append(b)
            adjacency[b].append(a)

        color = [0] * (n + 1)  # 0 = uncolored, 1 / -1 = the two groups
        # The dislike graph may be disconnected, so the scan restarts the
        # DFS from every still-uncolored person; each run colors one
        # whole connected component.
        for start in range(1, n + 1):
            if color[start] != 0:
                continue
            color[start] = 1
            # The stack drives a depth-first sweep: pop a person, then
            # push every uncolored neighbor with the opposite color
            # (marking on push); a neighbor already sharing the current
            # color closes an odd cycle, so no split exists.
            stack = [start]
            while stack:
                person = stack.pop()
                for neighbor in adjacency[person]:
                    if color[neighbor] == 0:
                        color[neighbor] = -color[person]
                        stack.append(neighbor)
                    elif color[neighbor] == color[person]:
                        return False
        return True
