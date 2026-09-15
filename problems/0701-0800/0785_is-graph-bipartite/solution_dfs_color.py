from typing import List, Optional


class Solution:
    def isBipartite(self, graph: List[List[int]]) -> bool:
        n = len(graph)
        # 0 = uncolored, else +1/-1: bipartite iff a proper 2-coloring
        # exists, with each node forced to the opposite of the color it
        # is reached from.
        color = [0] * n
        # The graph may be disconnected: start a fresh DFS from every
        # still-uncolored node.
        for start in range(n):
            if color[start] != 0:
                continue
            color[start] = 1
            # Mark-on-push stack discipline: a node is colored when it
            # enters the stack, so it can never be pushed twice.
            stack = [start]
            while stack:
                u = stack.pop()
                for v in graph[u]:
                    # Uncolored neighbor: take the opposite color.
                    if color[v] == 0:
                        color[v] = -color[u]
                        stack.append(v)
                    # Same-color edge = odd cycle, the sole
                    # obstruction to bipartiteness.
                    elif color[v] == color[u]:
                        return False
        # Every component colored cleanly: the two color classes are
        # the required partition.
        return True
