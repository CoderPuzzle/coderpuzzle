from typing import List


class Solution:
    def minOperationsQueries(self, n: int, edges: List[List[int]], queries: List[List[int]]) -> List[int]:
        adjacency = [[] for _ in range(n)]
        for u, v, w in edges:
            adjacency[u].append((v, w - 1))
            adjacency[v].append((u, w - 1))

        # One breadth-first search from node 0 fills every static structure:
        # parent/depth and a parent-before-child order that both the weight
        # frequency prefixes and the lifting table consume in one sweep. The
        # queue keeps a 10^4-node path off the call stack.
        parent = [0] * n
        pweight = [0] * n
        depth = [0] * n
        order = [0]
        seen = [False] * n
        seen[0] = True
        head = 0
        while head < len(order):
            node = order[head]
            head += 1
            for nxt, w in adjacency[node]:
                if not seen[nxt]:
                    seen[nxt] = True
                    parent[nxt] = node
                    pweight[nxt] = w
                    depth[nxt] = depth[node] + 1
                    order.append(nxt)

        # Changing an edge to any value leaves other edges untouched, so an
        # operation fixes exactly one edge of the path and the answer is the
        # path length minus its most frequent edge weight. Weights live in
        # 1..26, so freq[w][v] counts weight-w edges from the root down to v;
        # on the a..b path that count is freq[a][w] + freq[b][w] - 2 *
        # freq[lca][w]: every edge above the lowest common ancestor appears in
        # both root paths and cancels, and the LCA's own incoming edge cancels
        # with itself.
        freq = [[0] * n for _ in range(26)]
        for v in order[1:]:
            pv = parent[v]
            for w in range(26):
                freq[w][v] = freq[w][pv]
            freq[pweight[v]][v] += 1

        # Binary lifting over the parent pointers: table[k][v] is the 2^k-th
        # ancestor of v (the root maps to itself), which makes each query an
        # O(log n) climb instead of a walk along the possibly O(n) path.
        levels = max(1, max(depth).bit_length())
        table = [parent]
        for level in range(1, levels):
            previous = table[level - 1]
            table.append([previous[node] for node in previous])

        answers = []
        for a, b in queries:
            u, v = a, b
            du, dv = depth[u], depth[v]
            if du < dv:
                u, v = v, u
                du, dv = dv, du
            diff = du - dv
            level = 0
            while diff:
                if diff & 1:
                    u = table[level][u]
                diff >>= 1
                level += 1
            if u != v:
                for level in range(levels - 1, -1, -1):
                    row = table[level]
                    if row[u] != row[v]:
                        u = row[u]
                        v = row[v]
                lca = parent[u]
            else:
                lca = u
            best = -1
            for w in range(26):
                count = freq[w][a] + freq[w][b] - 2 * freq[w][lca]
                if count > best:
                    best = count
            path_length = depth[a] + depth[b] - 2 * depth[lca]
            answers.append(path_length - best)
        return answers
