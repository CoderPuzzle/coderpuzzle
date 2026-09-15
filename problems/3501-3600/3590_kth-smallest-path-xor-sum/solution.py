from bisect import bisect_left
from typing import List


class Solution:
    def kthSmallest(self, par: List[int], vals: List[int], queries: List[List[int]]) -> List[int]:
        # Path XOR root -> node, then bottom-up small-to-large merging of
        # sorted distinct XOR lists: a subtree's list is its largest
        # child's list (reused) grown by the node's own value and every
        # other child's distinct values, so each element only moves into
        # lists that keep doubling. A small child (under 64 values)
        # splices element-by-element — binary search plus one contiguous
        # insert — while a large child folds in with a single two-pointer
        # pass that dedupes as it goes. Queries are grouped by node and
        # answered by indexing the final list at k - 1, or -1 past the
        # end. The tree can be a 5 * 10**4-node chain, so the DFS is an
        # explicit stack.
        n = len(vals)
        children = [[] for _ in range(n)]
        for node in range(1, n):
            children[par[node]].append(node)
        order = []  # preorder: every parent precedes its children
        path = [0] * n
        stack = [0]
        while stack:
            node = stack.pop()
            order.append(node)
            path[node] = vals[node] ^ (path[par[node]] if node else 0)
            stack.extend(children[node])
        by_node = {}  # node -> [(k, query index)], grouped for the sweep
        for j, (u, k) in enumerate(queries):
            by_node.setdefault(u, []).append((k, j))
        answers = [0] * len(queries)
        lists = [None] * n
        for node in reversed(order):  # children finish before their parent
            kids = children[node]
            base = -1
            for child in kids:
                if base < 0 or len(lists[child]) > len(lists[base]):
                    base = child
            acc = lists[base] if base >= 0 else []
            own = path[node]
            pos = bisect_left(acc, own)
            if pos == len(acc) or acc[pos] != own:
                acc.insert(pos, own)
            for child in kids:
                small = lists[child]
                if child == base:
                    continue
                if len(small) >= 64:
                    acc = sorted(set(small).union(acc))
                else:
                    for value in small:
                        pos = bisect_left(acc, value)
                        if pos == len(acc) or acc[pos] != value:
                            acc.insert(pos, value)
            lists[node] = acc
            for k, j in by_node.get(node, ()):
                answers[j] = acc[k - 1] if k <= len(acc) else -1
        return answers
