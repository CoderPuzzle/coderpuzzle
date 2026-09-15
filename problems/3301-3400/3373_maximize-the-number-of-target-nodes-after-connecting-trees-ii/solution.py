from typing import List


class Solution:
    def maxTargetNodes(self, edges1: List[List[int]], edges2: List[List[int]]) -> List[int]:
        # In a tree, distance parity is the difference of depth parities,
        # so the nodes target to u are exactly u's own bipartition class
        # and a second-tree node v contributes its opposite class. One
        # iterative BFS per tree (a 1e5-node path would overflow the
        # CPython recursion limit) labels each node's parity and sizes
        # both classes: answer[i] is tree 1's class size at i's parity,
        # plus tree 2's larger class — the maximum opposite-class count
        # over every connection node, identical for every i.

        def classify(edges):
            n = len(edges) + 1
            adj = [[] for _ in range(n)]
            for a, b in edges:
                adj[a].append(b)
                adj[b].append(a)
            parity = [-1] * n
            parity[0] = 0
            counts = [1, 0]
            queue = [0]
            head = 0
            while head < len(queue):
                u = queue[head]
                head += 1
                for w in adj[u]:
                    if parity[w] < 0:
                        parity[w] = parity[u] ^ 1
                        counts[parity[w]] += 1
                        queue.append(w)
            return parity, counts

        best2 = max(classify(edges2)[1])
        parity1, counts1 = classify(edges1)
        return [counts1[p] + best2 for p in parity1]
