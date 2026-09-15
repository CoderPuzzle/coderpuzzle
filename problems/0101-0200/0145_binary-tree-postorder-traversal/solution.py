from typing import List, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        result = []
        if root is None:
            return result
        stack = [root]
        # Loop invariant: `stack` holds nodes still to be expanded; each is
        # emitted the moment it is popped. Children are pushed left first,
        # so the right child is always expanded before the left one.
        while stack:
            node = stack.pop()
            result.append(node.val)
            # Left first, right on top: the emits so far read root, right,
            # left — preorder with the two children swapped.
            if node.left is not None:
                stack.append(node.left)
            if node.right is not None:
                stack.append(node.right)
        # Root-right-left read backwards is left-right-root: postorder.
        result.reverse()
        return result
