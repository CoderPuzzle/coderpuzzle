from typing import List, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        # Depth-first with the right child tried first: at every depth the
        # first node popped is the rightmost one there, the node the right
        # edge sees.
        view = []
        stack = [(root, 0)] if root is not None else []
        while stack:
            node, depth = stack.pop()
            # A depth earns its entry only on that first arrival; every
            # later node popped at the same depth sits further left.
            if depth == len(view):
                view.append(node.val)
            # Left pushed before right, so the right child pops first.
            if node.left is not None:
                stack.append((node.left, depth + 1))
            if node.right is not None:
                stack.append((node.right, depth + 1))
        return view
