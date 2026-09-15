from typing import Optional


class Solution:
    def removeLeafNodes(self, root: Optional[TreeNode], target: int) -> Optional[TreeNode]:
        # Post-order prune with an explicit stack (a 3000-node chain would
        # overflow any recursion budget): children are judged before the node
        # itself, so the whole cascade collapses in one pass. Dead nodes are
        # detached from their parent the moment they are judged.
        if root is None:
            return None
        # (node, parent, side, expanded) — side 0 = left, 1 = right.
        stack = [(root, None, 0, False)]
        while stack:
            node, parent, side, expanded = stack.pop()
            if not expanded:
                stack.append((node, parent, side, True))
                if node.left is not None:
                    stack.append((node.left, node, 0, False))
                if node.right is not None:
                    stack.append((node.right, node, 1, False))
                continue
            if node.left is None and node.right is None and node.val == target:
                if parent is None:
                    return None
                if side == 0:
                    parent.left = None
                else:
                    parent.right = None
        return root
