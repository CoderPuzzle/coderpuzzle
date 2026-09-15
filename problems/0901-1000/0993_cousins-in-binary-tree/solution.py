from typing import List, Optional, Tuple


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def isCousins(self, root: Optional[TreeNode], x: int, y: int) -> bool:
        # Cousinhood is a fact about two coordinates, not about either node
        # alone: the depth a node sits at and the parent it hangs from. One
        # descent — an explicit stack whose frames are (node, depth, parent
        # value) — records both coordinates for the nodes valued x and y,
        # and stops the moment the second of them is met. The verdict then
        # reads straight off the records: same depth, different parents.
        # The root rides with the sentinel parent 0, harmless because no
        # node value is 0 and the root is alone at depth 0.
        depth_x = depth_y = -1
        parent_x = parent_y = 0
        pending: List[Tuple[Optional[TreeNode], int, int]] = [(root, 0, 0)]
        while pending:
            node, depth, parent = pending.pop()
            if node is None:
                continue
            if node.val == x:
                depth_x, parent_x = depth, parent
            elif node.val == y:
                depth_y, parent_y = depth, parent
            if depth_x >= 0 and depth_y >= 0:
                break
            if node.right is not None:
                pending.append((node.right, depth + 1, node.val))
            if node.left is not None:
                pending.append((node.left, depth + 1, node.val))
        return depth_x == depth_y and parent_x != parent_y
