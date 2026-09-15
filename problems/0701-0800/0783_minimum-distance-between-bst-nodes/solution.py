from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def minDiffInBST(self, root: Optional[TreeNode]) -> int:
        # An inorder walk of a BST visits the values in ascending order, so
        # the closest pair in the whole tree appears as two consecutive
        # visits — any two values with a third between them sit farther
        # apart than that third sits from one of them. The walk keeps only
        # the previously visited value and folds in the smallest difference
        # to the current one.
        best = None
        prev = None
        # The stack, not the call stack, drives the descent to each
        # leftmost node and the step back up — the tree may legally be a
        # single 100-node chain.
        stack = []
        node = root
        while stack or node is not None:
            while node is not None:
                stack.append(node)
                node = node.left
            node = stack.pop()
            if prev is not None:
                diff = node.val - prev
                if best is None or diff < best:
                    best = diff
            prev = node.val
            node = node.right
        return best
