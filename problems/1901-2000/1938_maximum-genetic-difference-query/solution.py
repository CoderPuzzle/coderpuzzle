from typing import List, Optional


class Solution:
    def maxGeneticDifference(self, parents: List[int], queries: List[List[int]]) -> List[int]:
        BITS = 18
        n = len(parents)
        children = [[] for _ in range(n)]
        root = -1
        for i, p in enumerate(parents):
            if p == -1:
                root = i
            else:
                children[p].append(i)

        by_node = [[] for _ in range(n)]
        for idx, q in enumerate(queries):
            node, val = q[0], q[1]
            by_node[node].append((val, idx))

        ans = [0] * len(queries)

        # trie stored as flat lists: children[bit] indices and subtree counts
        nxt = [[0, 0]]
        count = [0]

        def insert(x, delta):
            node = 0
            count[node] += delta
            for b in range(BITS - 1, -1, -1):
                bit = (x >> b) & 1
                if nxt[node][bit] == 0:
                    nxt[node][bit] = len(nxt)
                    nxt.append([0, 0])
                    count.append(0)
                node = nxt[node][bit]
                count[node] += delta

        def query_max(x):
            node = 0
            res = 0
            for b in range(BITS - 1, -1, -1):
                bit = (x >> b) & 1
                want = 1 - bit
                cand = nxt[node][want]
                if cand and count[cand] > 0:
                    res |= 1 << b
                    node = cand
                else:
                    node = nxt[node][bit]
            return res

        stack = [(root, False)]
        while stack:
            u, exiting = stack.pop()
            if exiting:
                insert(u, -1)
                continue
            stack.append((u, True))
            insert(u, 1)
            for val, idx in by_node[u]:
                ans[idx] = query_max(val)
            for v in children[u]:
                stack.append((v, False))

        return ans
