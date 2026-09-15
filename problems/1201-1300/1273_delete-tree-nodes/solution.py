from typing import List


class Solution:
    def deleteTreeNodes(self, nodes: int, parent: List[int], value: List[int]) -> int:
        # Fold bottom-up: each node hands its parent its subtree sum and
        # the number of kept nodes below it — but only if its own subtree
        # sum survived as nonzero. A zero-sum subtree contributes nothing
        # to either, which is exactly the cascade: its values stop counting
        # toward every ancestor's sum too. (A removed child's sum is 0, so
        # ancestors' sums are unchanged by the removal — folding or not
        # folding zero-sum children keeps the arithmetic consistent.)
        children = [[] for _ in range(nodes)]
        for i, p in enumerate(parent):
            if p >= 0:
                children[p].append(i)
        # Top-down visit order (parents before children), then reversed.
        order = []
        stack = [0]
        while stack:
            node = stack.pop()
            order.append(node)
            stack.extend(children[node])
        sub_sum = value[:]
        kept = [1] * nodes
        for node in reversed(order):
            p = parent[node]
            if p >= 0 and sub_sum[node] != 0:
                sub_sum[p] += sub_sum[node]
                kept[p] += kept[node]
        return kept[0] if sub_sum[0] != 0 else 0
