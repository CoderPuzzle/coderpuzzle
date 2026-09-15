class Solution:
    def calcEquation(self, equations: list[list[str]], values: list[float], queries: list[list[str]]) -> list[float]:
        # Weighted union-find over the variable names: parent[x] is x's
        # current parent and weight[x] holds x / parent[x], so the product
        # along a parent chain is the member's ratio to its root.
        parent = {}
        weight = {}
        size = {}

        def add(node):
            if node not in parent:
                parent[node] = node
                weight[node] = 1.0
                size[node] = 1

        def find(node):
            # Walk up to the root folding the chain into one node / root
            # product, then re-hang every visited node directly on the root
            # (path compression), each stored weight becoming that product.
            root, product = node, 1.0
            while parent[root] != root:
                product *= weight[root]
                root = parent[root]
            while parent[node] != root:
                nxt = parent[node]
                step = weight[node]
                parent[node] = root
                weight[node] = product
                node, product = nxt, product / step
            return root, product

        def unite(a, b, value):
            # Fold one stated ratio a / b = value into the forest.
            root_a, ratio_a = find(a)
            root_b, ratio_b = find(b)
            if root_a == root_b:
                # The batch never contradicts itself, so a ratio restating
                # an existing link agrees with the folded product.
                return
            # Union by size: hang the smaller tree under the larger.
            if size[root_a] < size[root_b]:
                root_a, root_b = root_b, root_a
                ratio_a, ratio_b = ratio_b, ratio_a
                value = 1.0 / value
            # a = value * b written in root terms, ratio_a * root_a =
            # value * ratio_b * root_b, solves the new weight root_b / root_a.
            parent[root_b] = root_a
            weight[root_b] = ratio_a / (value * ratio_b)
            size[root_a] += size[root_b]

        for (a, b), value in zip(equations, values):
            add(a)
            add(b)
            unite(a, b, value)

        def query(start, end):
            # An unknown variable is unanswerable (this also covers x / x for
            # an undefined x); a known variable over itself is 1.0.
            if start not in parent or end not in parent:
                return -1.0
            root_start, ratio_start = find(start)
            root_end, ratio_end = find(end)
            if root_start != root_end:
                # Different roots mean no stated ratio links the two groups.
                return -1.0
            return ratio_start / ratio_end

        return [query(c, d) for c, d in queries]
