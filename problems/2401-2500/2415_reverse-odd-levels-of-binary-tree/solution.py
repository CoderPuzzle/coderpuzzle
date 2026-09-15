from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def reverseOddLevels(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        # Only values move — children stay attached — so reversing an odd
        # level means writing its value list back mirrored: first position
        # takes the last value, and so on inward. A frontier of nodes starts
        # at the root and steps down one level per round, mirroring each odd
        # level's values on arrival. Breadth-first on purpose: levels are
        # exactly the reversal units, and the perfect tree holds up to 2^14
        # nodes.
        row: List[TreeNode] = [root]
        depth = 0
        while row:
            if depth % 2 == 1:
                values = [node.val for node in row]
                for index, node in enumerate(row):
                    node.val = values[-1 - index]
            nxt = []
            for node in row:
                if node.left is not None:
                    nxt.append(node.left)
                    nxt.append(node.right)
            row = nxt
            depth += 1
        return root
