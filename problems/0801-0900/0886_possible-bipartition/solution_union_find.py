from typing import List, Optional


class Solution:
    def possibleBipartition(self, n: int, dislikes: List[List[int]]) -> bool:
        # Dislike is symmetric, so build an undirected adjacency list: the
        # unions below need, for every person, everyone that person avoids.
        adjacency = [[] for _ in range(n + 1)]
        for a, b in dislikes:
            adjacency[a].append(b)
            adjacency[b].append(a)

        parent = list(range(n + 1))

        # Path-halving: splice every other node directly under its
        # grandparent, flattening the tree while walking to the root.
        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        # Everyone a person dislikes must land in one set (the opposite
        # group), so union them all onto that person's first enemy.
        for person in range(1, n + 1):
            for neighbor in adjacency[person][1:]:
                ra, rb = find(adjacency[person][0]), find(neighbor)
                if ra != rb:
                    parent[ra] = rb

        # The split works exactly when no dislike pair ended up merged.
        for a, b in dislikes:
            if find(a) == find(b):
                return False
        return True
