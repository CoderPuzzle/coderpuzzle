from typing import Dict, List, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def lcaDeepestLeaves(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        # A pre-order stack walk lists parents before children, so the
        # reversed list settles every child's height before its parent
        # reads it.
        order: List[TreeNode] = []
        queue = [root] if root is not None else []
        while queue:
            node = queue.pop()
            order.append(node)
            for child in (node.left, node.right):
                if child is not None:
                    queue.append(child)
        height: Dict[int, int] = {}
        for node in reversed(order):
            kids = [height[id(c)] for c in (node.left, node.right) if c is not None]
            height[id(node)] = 1 + max(kids) if kids else 0
        # Descend toward the taller child; a tie means both sides reach the
        # deepest leaves, so this node is their lowest common ancestor.
        node = root
        while node is not None:
            left_h = height[id(node.left)] if node.left is not None else -1
            right_h = height[id(node.right)] if node.right is not None else -1
            if left_h > right_h:
                node = node.left
            elif right_h > left_h:
                node = node.right
            else:
                return node
        return None
