from collections import deque
from typing import Deque, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def isCompleteTree(self, root: Optional[TreeNode]) -> bool:
        # Number the positions the way a heap numbers them — root at 1,
        # children of slot i at 2i and 2i+1. Draining the queue front-first
        # surfaces nodes in exactly slot order (absent children ride along
        # as None placeholders), so the first None drained is the first
        # unoccupied slot, and any real node after it sits beyond a hole
        # that completeness cannot afford.
        pending: Deque[Optional[TreeNode]] = deque([root])
        gap_seen = False
        while pending:
            node = pending.popleft()
            if node is None:
                gap_seen = True
            elif gap_seen:
                return False
            else:
                pending.append(node.left)
                pending.append(node.right)
        return True
