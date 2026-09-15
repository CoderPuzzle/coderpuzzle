from typing import List, Optional


class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        # In-order traversal of a BST visits values in ascending order, so
        # the kth visit is the kth smallest. The explicit stack simulates the
        # recursion, keeping space proportional to the tree height.
        stack = []
        node = root
        while node or stack:
            # Push and descend the left spine as far as possible.
            while node:
                stack.append(node)
                node = node.left
            # Left spine exhausted: popping is the "visit".
            node = stack.pop()
            k -= 1
            # Early stop: the unvisited remainder is never touched.
            if k == 0:
                return node.val
            node = node.right
        return -1
