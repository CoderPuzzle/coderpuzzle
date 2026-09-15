from typing import Dict, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def maximumAverageSubtree(self, root: Optional[TreeNode]) -> float:
        # Pre-order listing: each descendant appears after its ancestor, so
        # the reversed list settles both subtrees before the node above them.
        order: list = []
        stack: list = [root] if root is not None else []
        while stack:
            node = stack.pop()
            order.append(node)
            # Push right first so left is visited first in the listing.
            if node.right is not None:
                stack.append(node.right)
            if node.left is not None:
                stack.append(node.left)
        aggregate: Dict[int, tuple] = {}  # id(node) -> (sum, size)
        best = 0.0
        for node in reversed(order):
            total = node.val
            size = 1
            for child in (node.left, node.right):
                if child is not None:
                    child_sum, child_size = aggregate[id(child)]
                    total += child_sum
                    size += child_size
            aggregate[id(node)] = (total, size)
            best = max(best, total / size)
        return best
