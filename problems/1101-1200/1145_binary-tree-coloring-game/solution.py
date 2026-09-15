from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def btreeGameWinningMove(self, root: Optional[TreeNode], n: int, x: int) -> bool:
        def count(node: Optional[TreeNode]) -> int:
            if node is None:
                return 0
            return 1 + count(node.left) + count(node.right)

        def find(node: Optional[TreeNode]) -> Optional[TreeNode]:
            if node is None or node.val == x:
                return node
            return find(node.left) or find(node.right)

        target = find(root)
        left = count(target.left)
        right = count(target.right)
        above = n - left - right - 1
        # Grabbing the largest of the three regions wins iff it alone holds
        # the majority of all nodes.
        return max(left, right, above) * 2 > n
