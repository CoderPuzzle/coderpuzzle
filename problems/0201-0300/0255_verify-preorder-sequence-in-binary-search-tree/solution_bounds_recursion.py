import sys
from typing import List


class Solution:
    def verifyPreorder(self, preorder: List[int]) -> bool:
        # Each recursive call charges one node with the open interval (low,
        # high) its ancestors stake out — the search-tree property confines
        # every node to that interval. A claimed value tightens the interval
        # for the left call to (low, value) and for the right call to
        # (value, high), and the cursor is shared, so a value one interval
        # rejects waits in place for the ancestor that still admits it.
        # The call chain nests once per level of the implied tree — the
        # full length on a sorted spine — past CPython's default recursion
        # limit, so lift it for the run.
        sys.setrecursionlimit(len(preorder) + 1000)
        cursor = 0

        def walk(low, high):
            nonlocal cursor
            if cursor < len(preorder) and low < preorder[cursor] < high:
                value = preorder[cursor]
                cursor += 1
                # Preorder emits a node, then its whole left side, then its
                # right side, so the left call runs first and lines the
                # recursion up with the array.
                walk(low, value)
                walk(value, high)

        walk(float("-inf"), float("inf"))
        # Every value claimed is every value placed in the one slot the
        # ordering rules leave open.
        return cursor == len(preorder)
