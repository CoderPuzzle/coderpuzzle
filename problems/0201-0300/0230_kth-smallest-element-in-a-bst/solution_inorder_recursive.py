from typing import List, Optional


class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        # In-order traversal of a BST visits values in ascending order, so
        # the kth visit is the kth smallest. k counts down inside the
        # closure; the visit that zeroes it records the answer.
        answer = -1

        def visit(node: Optional[TreeNode]) -> None:
            nonlocal k, answer
            # Early stop: once the answer is recorded, the unvisited
            # remainder of the tree is never touched.
            if node is None or k == 0:
                return
            visit(node.left)
            k -= 1
            if k == 0:
                answer = node.val
                return
            visit(node.right)

        # Recursion depth is bounded by the tree height h (worst case n on
        # a chain), which is why the iterative twin exists.
        visit(root)
        return answer
