from collections import deque
from typing import Deque, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def isUnivalTree(self, root: Optional[TreeNode]) -> bool:
        # The root's value is the one every node must carry, so a single
        # reference value is all the scan needs. It reads the tree level
        # by level — a queue seeded with the root, drained front-first,
        # children appended left before right — and answers false at the
        # first node that disagrees; a queue that drains clean leaves
        # every node vouched for, which is true. The queue, not the call
        # stack, carries the walk — a hundred-node chain of one value is
        # within the constraints, and no frame ever nests.
        if root is None:
            return True
        pending: Deque[TreeNode] = deque([root])
        while pending:
            node = pending.popleft()
            if node.val != root.val:
                return False
            if node.left is not None:
                pending.append(node.left)
            if node.right is not None:
                pending.append(node.right)
        return True
