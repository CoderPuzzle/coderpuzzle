from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def equalToDescendants(self, root: Optional[TreeNode]) -> int:
        # A reverse preorder walk visits children before parents, so
        # processing the collected nodes back-to-front lets each node's
        # subtree sum be built from its children's already-computed sums.
        # A node counts when its value equals the sum of its descendants,
        # i.e. its subtree sum minus its own value. The traversal is fully
        # iterative, so a 10^5-deep skewed tree cannot overflow any stack.
        order: List[TreeNode] = []
        pending = [root]
        while pending:
            node = pending.pop()
            order.append(node)
            if node.right is not None:
                pending.append(node.right)
            if node.left is not None:
                pending.append(node.left)
        subtree = {}
        count = 0
        for node in reversed(order):
            total = node.val + subtree.get(node.left, 0) + subtree.get(node.right, 0)
            subtree[node] = total
            if node.val == total - node.val:
                count += 1
        return count
