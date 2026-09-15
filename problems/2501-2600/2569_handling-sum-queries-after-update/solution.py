from typing import List, Optional


class _SegTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self.lazy = [False] * (4 * self.n)
        self._build(1, 0, self.n - 1, arr)

    def _build(self, node, lo, hi, arr):
        if lo == hi:
            self.tree[node] = arr[lo]
            return
        mid = (lo + hi) // 2
        self._build(node * 2, lo, mid, arr)
        self._build(node * 2 + 1, mid + 1, hi, arr)
        self.tree[node] = self.tree[node * 2] + self.tree[node * 2 + 1]

    def _apply(self, node, lo, hi):
        # Flipping a 0/1 segment swaps every bit, so its sum of ones
        # becomes segment_length - sum; the children's flip is deferred.
        self.tree[node] = (hi - lo + 1) - self.tree[node]
        self.lazy[node] = not self.lazy[node]

    def _push(self, node, lo, hi):
        # lazy means "children's data is stale": hand the pending flip to
        # both children and clear it before recursing below this node.
        if self.lazy[node]:
            mid = (lo + hi) // 2
            self._apply(node * 2, lo, mid)
            self._apply(node * 2 + 1, mid + 1, hi)
            self.lazy[node] = False

    def flip(self, node, lo, hi, ql, qr):
        if ql > hi or qr < lo:
            return
        # A node fully inside [ql, qr] applies the flip locally and stops,
        # so a range flip touches O(log n) nodes, not O(r - l).
        if ql <= lo and hi <= qr:
            self._apply(node, lo, hi)
            return
        self._push(node, lo, hi)
        mid = (lo + hi) // 2
        self.flip(node * 2, lo, mid, ql, qr)
        self.flip(node * 2 + 1, mid + 1, hi, ql, qr)
        self.tree[node] = self.tree[node * 2] + self.tree[node * 2 + 1]

    def count_ones(self):
        # Lazy application keeps every node's own sum correct, so reading
        # the root needs no push.
        return self.tree[1]


class Solution:
    def handleQuery(self, nums1: List[int], nums2: List[int], queries: List[List[int]]) -> List[int]:
        n = len(nums1)
        seg = _SegTree(nums1)
        # Maintain sum(nums2) incrementally: nums2 is never materialized
        # or rescanned (n, q up to 1e5 and values up to 1e9).
        total = sum(nums2)
        answers = []
        for q in queries:
            kind = q[0]
            if kind == 1:
                seg.flip(1, 0, n - 1, q[1], q[2])
            elif kind == 2:
                # nums2[i] += nums1[i] * p shifts the total by exactly
                # p times the current number of ones.
                total += q[1] * seg.count_ones()
            else:
                answers.append(total)
        return answers
