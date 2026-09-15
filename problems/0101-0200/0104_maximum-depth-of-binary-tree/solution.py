from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        depth = 0
        level = [root] if root is not None else []
        # Loop invariant: `level` holds exactly one level's nodes, so one
        # full round of rebuilding it counts exactly one level of depth.
        while level:
            depth += 1
            # Collect only the real children; a leaf contributes nothing, so
            # an all-leaf level ends the traversal with `depth` complete.
            level = [child for node in level for child in (node.left, node.right) if child is not None]
        return depth
