from typing import List, Optional


class Solution:
    def balanceBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        # phase 1: iterative in-order walk flattens the BST into sorted
        # values (explicit stack dodges recursion limits on chain inputs)
        values = []
        stack, current = [], root
        while stack or current:
            while current:
                stack.append(current)
                current = current.left
            current = stack.pop()
            values.append(current.val)
            current = current.right

        # phase 2: midpoint as root leaves at most half the range per side,
        # so subtree depths differ by <= 1 (build recursion is O(log n) deep)
        def build(lo, hi):
            if lo > hi:
                return None
            mid = (lo + hi) // 2
            node = TreeNode(values[mid])
            node.left = build(lo, mid - 1)
            node.right = build(mid + 1, hi)
            return node

        return build(0, len(values) - 1)
