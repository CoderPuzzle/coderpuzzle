from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def binaryTreePaths(self, root: Optional[TreeNode]) -> List[str]:
        paths: List[str] = []

        # Pre-order walk carrying the half-built string: each step appends
        # "->" and the child's value, and a leaf commits the whole path.
        def walk(node: TreeNode, path: str) -> None:
            extended = path + str(node.val)
            # A leaf is a node with no children — both absent. A node with
            # only one child is a pass-through, never a terminal.
            if node.left is None and node.right is None:
                paths.append(extended)
                return
            # Left subtree before right, so paths are emitted in the order
            # the pinned depth-first walk meets the leaves.
            if node.left is not None:
                walk(node.left, extended + "->")
            if node.right is not None:
                walk(node.right, extended + "->")

        # The constraints guarantee at least one node, so root is never None.
        walk(root, "")
        return paths
