from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def flipEquiv(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        # Flip equivalence is a question of pairing: some way of walking
        # the trees together, committing at each paired node to the
        # straight or the swapped alignment of children, must run out of
        # nodes without a disagreement. The stack carries the pairs.

        def aligned(a: Optional[TreeNode], b: Optional[TreeNode]) -> bool:
            if a is None or b is None:
                return a is None and b is None
            return a.val == b.val

        pending: list[tuple[Optional[TreeNode], Optional[TreeNode]]] = [(root1, root2)]
        while pending:
            a, b = pending.pop()
            if a is None and b is None:
                continue
            if a is None or b is None or a.val != b.val:
                return False
            if aligned(a.left, b.left) and aligned(a.right, b.right):
                pending.append((a.left, b.left))
                pending.append((a.right, b.right))
            elif aligned(a.left, b.right) and aligned(a.right, b.left):
                pending.append((a.left, b.right))
                pending.append((a.right, b.left))
            else:
                return False
        return True
