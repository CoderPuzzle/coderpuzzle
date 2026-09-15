from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        if root is None:
            # The empty tree has no root-to-leaf path at all, so no
            # targetSum — not even 0 — can be matched.
            return False
        # Loop invariant: the stack holds (node, remaining) pairs where
        # remaining is targetSum minus the sum of the values strictly
        # above `node`, so a leaf settles its whole path in one compare.
        stack = [(root, targetSum)]
        while stack:
            node, remaining = stack.pop()
            if node.left is None and node.right is None:
                # The path ends here, so it qualifies exactly when the
                # leaf itself covers what is still owed.
                if remaining == node.val:
                    return True
            else:
                # An internal node never decides: only leaves can match,
                # even when the running sum already equals targetSum.
                for child in (node.left, node.right):
                    if child is not None:
                        stack.append((child, remaining - node.val))
        return False
