from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def minDepth(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0
        depth = 0
        frontier = [root]
        # Loop invariant: `frontier` holds exactly one level's nodes, and
        # every node above them is internal, so the first leaf met in
        # level order sits at the minimum depth.
        while frontier:
            depth += 1
            next_frontier = []
            for node in frontier:
                if node.left is None and node.right is None:
                    # A leaf at this depth ends the search: BFS never
                    # visits below the minimum depth, which is the point.
                    return depth
                for child in (node.left, node.right):
                    if child is not None:
                        next_frontier.append(child)
            frontier = next_frontier
        # Unreachable for a non-empty tree (its last level is all leaves);
        # kept only so the method always returns a value.
        return depth
