class Solution:
    def findAnswer(self, parent: list[int], s: str) -> list[bool]:
        n = len(parent)
        children = [[] for _ in range(n)]
        for i in range(1, n):
            children[parent[i]].append(i)

        # Postorder tour of the whole tree: dfs(x) appends every subtree
        # string of x before s[x], so the subtree of node i is exactly the
        # tour segment of length size[i] ending at i's own position. One
        # traversal from the root therefore fixes every node's segment. The
        # stack version below visits children in decreasing order, whose
        # reverse is the required postorder (children increasing, node
        # last).
        pre = []
        stack = [0]
        while stack:
            v = stack.pop()
            pre.append(v)
            stack.extend(children[v])
        post = pre[::-1]
        tour = "".join(s[v] for v in post)
        pos = [0] * n
        size = [1] * n
        for idx, v in enumerate(post):
            pos[v] = idx
        for v in post:
            if parent[v] >= 0:
                size[parent[v]] += size[v]

        # Manacher's algorithm on the tour: p[i] is the palindrome radius
        # at center i of the '#' interleaving. A substring [l, r] is a
        # palindrome iff the radius at its transformed center l + r + 1
        # covers its full length, so each node costs one comparison.
        t = "#" + "#".join(tour) + "#"
        m = len(t)
        p = [0] * m
        center = right = 0
        for i in range(m):
            if i < right:
                p[i] = min(right - i, p[2 * center - i])
            while i - p[i] - 1 >= 0 and i + p[i] + 1 < m and t[i - p[i] - 1] == t[i + p[i] + 1]:
                p[i] += 1
            if i + p[i] > right:
                center, right = i, i + p[i]

        return [p[pos[i] + pos[i] - size[i] + 2] >= size[i] for i in range(n)]
