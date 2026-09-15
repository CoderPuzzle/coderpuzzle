class Solution:
    def treeDiameter(self, edges: list[list[int]]) -> int:
        # No edges: a single-node tree, diameter 0.
        if not edges:
            return 0
        n = len(edges) + 1
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)

        # Iterative DFS from root 0 with an explicit stack. Each node is
        # recorded as it is popped, and entered only from the neighbor it
        # came from, so `order` meets parents before children.
        parent = [-1] * n
        order = []
        stack = [0]
        while stack:
            u = stack.pop()
            order.append(u)
            for v in adj[u]:
                if v != parent[u]:
                    parent[v] = u
                    stack.append(v)

        # Reversed, `order` is a bottom-up order: children settle before
        # parents. At each node the two deepest child heights combine:
        # their sum is the widest path turning there, the deeper one
        # alone is the node's own height for its parent.
        height = [0] * n
        diameter = 0
        for u in reversed(order):
            first = second = 0
            for v in adj[u]:
                if v != parent[u]:
                    child = height[v] + 1
                    if child > first:
                        first, second = child, first
                    elif child > second:
                        second = child
            height[u] = first
            if first + second > diameter:
                diameter = first + second
        return diameter
