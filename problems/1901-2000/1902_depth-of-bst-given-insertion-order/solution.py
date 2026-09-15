from typing import List, Optional


class Solution:
    def maxDepthBST(self, order: List[int]) -> int:
        # Inverting `order` gives pos[v], and the BST built by inserting
        # in that order is exactly the min-Cartesian tree of pos[1..n]:
        # the root is the first-inserted value and every subtree spans a
        # contiguous range of values. A monotonic stack over values 1..n
        # (pos increasing bottom to top) then recovers every parent in
        # O(n) — popping for v, the last value popped re-hangs as v's
        # left child, since it is the later-inserted of the two
        # value-neighbours v lands between, while a value popped earlier
        # keeps the stack-below parent it was given when pushed. Depths
        # fill in insertion order afterwards — a parent is always
        # inserted before its children — so two flat sweeps, no
        # recursion, cope with the 10^5-deep chains the constraints
        # allow.
        n = len(order)
        pos = [0] * (n + 1)
        for i, v in enumerate(order):
            pos[v] = i
        parent = [0] * (n + 1)
        stack = []
        for v in range(1, n + 1):
            last = 0
            while stack and pos[stack[-1]] > pos[v]:
                last = stack.pop()
            if last:
                parent[last] = v
            if stack:
                parent[v] = stack[-1]
            stack.append(v)
        depth = [0] * (n + 1)
        best = 0
        for v in order:
            depth[v] = depth[parent[v]] + 1 if parent[v] else 1
            if depth[v] > best:
                best = depth[v]
        return best
