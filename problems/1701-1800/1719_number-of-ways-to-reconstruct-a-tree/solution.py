from typing import List


class Solution:
    def checkWays(self, pairs: List[List[int]]) -> int:
        # The pair set of any valid tree is exactly its ancestor pairs, so
        # a node's adjacency names all of its ancestors and all of its
        # descendants at once. The root pairs with every other value, so
        # the largest degree must be V-1, where V is the number of
        # distinct values. Walk the values in decreasing degree order,
        # placing each one: every neighbor of v that is already placed
        # has degree at least v's, hence is an ancestor of v in every
        # valid tree, and the smallest-degree such neighbor is the
        # deepest one — v's parent. An ancestor's adjacency must then
        # swallow v's whole adjacency minus the parent itself; a
        # neighbor of v outside the parent's adjacency means no tree
        # realizes the pairs (0). A parent whose degree equals v's
        # differs from v exactly by the pair between them — the two can
        # be swapped, so more than one tree exists (2). Otherwise every
        # parent is forced and exactly one tree exists (1).
        adj = {}
        for pair in pairs:
            x, y = pair
            adj.setdefault(x, set()).add(y)
            adj.setdefault(y, set()).add(x)
        order = sorted(adj, key=lambda v: len(adj[v]), reverse=True)
        if len(adj[order[0]]) != len(adj) - 1:
            return 0
        placed = {order[0]}
        multiple = False
        for v in order[1:]:
            parent = None
            for u in adj[v]:
                if u in placed and (parent is None or len(adj[u]) < len(adj[parent])):
                    parent = u
            if parent is None or not adj[v] - {parent} <= adj[parent]:
                return 0
            if len(adj[parent]) == len(adj[v]):
                multiple = True
            placed.add(v)
        return 2 if multiple else 1
