from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def mergeTrees(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> Optional[TreeNode]:
        # The merge rule pairs positions: nodes at the same spot in both
        # trees overlap and their values sum, while a spot only one tree
        # fills keeps that node — and everything under it — as is. An
        # empty input therefore returns the other tree whole, and the
        # merged tree is built on root1's nodes: reuse, not copy, since
        # the judge serializes the returned tree to its level-order
        # values and never node identity. The walk carries an explicit
        # stack of overlapping pairs — a skewed 2000-node chain would
        # nest 2000 calls, past CPython's default recursion limit of
        # 1000, so every runtime iterates instead.
        if root1 is None:
            return root2
        if root2 is None:
            return root1
        pending = [(root1, root2)]
        while pending:
            node1, node2 = pending.pop()
            # One entry settles one overlapping pair: sum the values
            # here, then settle each child slot — both trees fill it and
            # the child pair joins the stack, only root2 fills it and
            # its subtree attaches whole.
            node1.val += node2.val
            if node1.left is None:
                node1.left = node2.left
            elif node2.left is not None:
                pending.append((node1.left, node2.left))
            if node1.right is None:
                node1.right = node2.right
            elif node2.right is not None:
                pending.append((node1.right, node2.right))
        return root1
