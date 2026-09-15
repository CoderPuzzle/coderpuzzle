from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def flipMatchVoyage(self, root: Optional[TreeNode], voyage: List[int]) -> List[int]:
        # The walk and the voyage run in lockstep: a preorder descent that
        # consumes one voyage value per node and, whenever the next value
        # names the right child rather than the left, flips the current
        # node and records it. Values are unique, so each flip decision is
        # forced — the recorded set is the smallest one, listed in the
        # order the resulting preorder meets the flipped nodes. Any
        # disagreement, or voyage entries left over, means no flip set
        # works: [-1].
        flips: List[int] = []
        cursor = 0
        total = len(voyage)
        pending: List[Optional[TreeNode]] = [root]
        while pending:
            node = pending.pop()
            if node is None:
                continue
            if cursor == total or voyage[cursor] != node.val:
                return [-1]
            cursor += 1
            left, right = node.left, node.right
            if left is not None and (cursor == total or voyage[cursor] != left.val):
                flips.append(node.val)
                left, right = right, left
            if right is not None:
                pending.append(right)
            if left is not None:
                pending.append(left)
        if cursor != total:
            return [-1]
        return flips
