class Solution:
    def findSpecialNodes(self, n: int, edges: list[list[int]]) -> str:
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)

        # Root at node 0 and sweep once for a BFS order plus parents: children
        # always sit after their parent in the order, and both passes lean on it.
        parent = [-1] * n
        order = [0]
        head = 0
        while head < len(order):
            u = order[head]
            head += 1
            for v in adj[u]:
                if v != parent[u]:
                    parent[v] = u
                    order.append(v)

        # Down pass, over the order reversed so each child is final before its
        # parent reads it: down[v] is the height of v's subtree. The top two
        # child chains ride along because the up pass must route around a
        # parent's best arm when the path re-enters through that arm.
        down = [0] * n
        second = [0] * n
        best_child = [-1] * n
        for v in reversed(order):
            p = parent[v]
            if p >= 0:
                chain = down[v] + 1
                if chain > down[p]:
                    second[p] = down[p]
                    down[p] = chain
                    best_child[p] = v
                elif chain > second[p]:
                    second[p] = chain

        # Up pass, forward over the order: up[v] is the longest path leaving
        # v's subtree through its parent, and max(down[v], up[v]) is v's
        # eccentricity. A sibling arm stands in for the parent's best arm
        # exactly when v owns that arm, which is why second was kept.
        up = [0] * n
        diameter = 0
        for v in order:
            p = parent[v]
            if p >= 0:
                arm = second[p] if v == best_child[p] else down[p]
                up[v] = max(up[p], arm) + 1
            diameter = max(diameter, down[v], up[v])

        # A node terminates a diameter exactly when its eccentricity equals
        # the tree's widest path, so compare and print.
        return "".join("1" if max(down[i], up[i]) == diameter else "0" for i in range(n))
