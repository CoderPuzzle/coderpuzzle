from collections import deque


class Solution:
    def findMinHeightTrees(self, n: int, edges: list[list[int]]) -> list[int]:
        # A one- or two-node tree is its own center; the general loop would
        # also mishandle two nodes that are each other's leaves.
        if n <= 2:
            return list(range(n))
        adjacency = [[] for _ in range(n)]
        degree = [0] * n
        for a, b in edges:
            adjacency[a].append(b)
            adjacency[b].append(a)
            degree[a] += 1
            degree[b] += 1
        # Peel the tree from the outside in, topological-sort style: delete
        # all current leaves at once, each layer shortening every longest
        # root-to-leaf distance of the remaining core.
        leaves = deque(i for i in range(n) if degree[i] == 1)
        remaining = n
        # The MHT root is the middle of the diameter path: one node when the
        # diameter has an even edge count, two adjacent middles when odd.
        while remaining > 2:
            # The snapshot of len(leaves) peels exactly this round's layer;
            # newly enqueued leaves wait for the next round.
            for _ in range(len(leaves)):
                leaf = leaves.popleft()
                remaining -= 1
                # The popped leaf's own degree is never zeroed; a popped
                # node is not examined again, so it is harmless.
                for neighbor in adjacency[leaf]:
                    degree[neighbor] -= 1
                    if degree[neighbor] == 1:
                        leaves.append(neighbor)
        # The one or two survivors are the centroids (MHT roots).
        return sorted(leaves)
