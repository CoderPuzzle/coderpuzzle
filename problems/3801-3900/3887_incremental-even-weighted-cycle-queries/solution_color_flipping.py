class Solution:
    def numberOfEdgesAdded(self, n: int, edges: list[list[int]]) -> int:
        parent = list(range(n))
        size = [1] * n
        color = [0] * n  # absolute color of each node within its component
        members = [[i] for i in range(n)]  # per-root member lists, for the flip

        def find(x):  # membership only: path halving, no parity bookkeeping
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        added = 0
        for u, v, w in edges:
            ru, rv = find(u), find(v)
            if ru == rv:
                # the standing path parity is color[u] ^ color[v]: an O(1) verdict
                if color[u] ^ color[v] == w:
                    added += 1
            else:
                if size[ru] < size[rv]:
                    ru, rv = rv, ru  # ru is now the larger root
                if color[u] ^ color[v] != w:
                    # recolor the smaller component: every relation inside it
                    # survives a uniform flip, while the new edge's demand flips
                    for m in members[rv]:
                        color[m] ^= 1
                parent[rv] = ru
                size[ru] += size[rv]
                members[ru].extend(members[rv])
                added += 1
        return added
