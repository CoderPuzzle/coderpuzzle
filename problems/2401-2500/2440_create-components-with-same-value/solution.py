from typing import List


class Solution:
    def componentValue(self, nums: List[int], edges: List[List[int]]) -> int:
        n = len(nums)
        adjacency = [[] for _ in range(n)]
        for a, b in edges:
            adjacency[a].append(b)
            adjacency[b].append(a)

        # iterative DFS from node 0: parents + a visitation order whose
        # reverse is a valid post-order
        parent = [-1] * n
        order = []
        stack = [0]
        while stack:
            node = stack.pop()
            order.append(node)
            for nxt in adjacency[node]:
                if nxt != parent[node]:
                    parent[nxt] = node
                    stack.append(nxt)

        # subtree sums: everything a node keeps after its own greedy cuts
        sums = list(nums)
        for node in reversed(order):
            if parent[node] >= 0:
                sums[parent[node]] += sums[node]

        total = sums[0]
        largest = max(nums)
        counts = set()
        divisor = 1
        while divisor * divisor <= total:
            if total % divisor == 0:
                counts.add(divisor)
                counts.add(total // divisor)
            divisor += 1
        for k in sorted(counts, reverse=True):
            value = total // k
            if value < largest:
                continue
            components = sum(1 for s in sums if s % value == 0)
            if components == k:
                return k - 1
        return 0
