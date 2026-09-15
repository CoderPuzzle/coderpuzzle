from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def leafSimilar(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        # Two trees are leaf-similar exactly when their leaf value
        # sequences agree, so the whole question is writing each sequence
        # down and comparing them. Each walk carries an explicit stack:
        # pop a node, record its value when both children are missing —
        # that node is a leaf — otherwise push the right child and then
        # the left, so the left subtree is always the next to pop and the
        # values come out in left-to-right order.

        def leaf_values(root: Optional[TreeNode]) -> list[int]:
            # An exhausted stack means the sequence is complete. Only
            # leaves are recorded, so internal values and the shapes
            # above the leaves never enter the comparison.
            values: list[int] = []
            pending = [root]
            while pending:
                node = pending.pop()
                if node is None:
                    continue
                if node.left is None and node.right is None:
                    values.append(node.val)
                    continue
                pending.append(node.right)
                pending.append(node.left)
            return values

        return leaf_values(root1) == leaf_values(root2)
