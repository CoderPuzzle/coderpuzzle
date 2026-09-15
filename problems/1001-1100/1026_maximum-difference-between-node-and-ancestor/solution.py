from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def maxAncestorDiff(self, root: Optional[TreeNode]) -> int:
        # Loop invariant: the stack holds (node, path_min, path_max) triples,
        # where path_min/path_max are the minimum and maximum values seen
        # among node's strict ancestors — node itself is not folded in yet.
        stack = [(root, root.val, root.val)]
        ans = 0
        while stack:
            node, path_min, path_max = stack.pop()
            # The best pairing for `node` always uses one of the two
            # running extremes above it: any other ancestor value lies
            # between path_min and path_max, so it can never beat both.
            ans = max(ans, abs(node.val - path_min), abs(node.val - path_max))
            new_min = min(path_min, node.val)
            new_max = max(path_max, node.val)
            for child in (node.left, node.right):
                if child is not None:
                    stack.append((child, new_min, new_max))
        return ans
