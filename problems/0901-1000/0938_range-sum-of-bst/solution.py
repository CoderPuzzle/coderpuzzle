from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def rangeSumBST(self, root: Optional[TreeNode], low: int, high: int) -> int:
        # A node below low drags its whole left subtree below low with it,
        # so only its right subtree can hold hits; a node above high is the
        # mirror image; an in-window node counts and either subtree may
        # still hit. That three-way rule visits exactly the nodes that can
        # matter. The walk carries its own stack: the constraints allow a
        # 2*10^4-node chain, and recursion would nest twenty thousand
        # frames — past CPython's default limit and over the 512k stacks
        # the judge hands Java and Node.
        total = 0
        stack = [root] if root is not None else []
        while stack:
            node = stack.pop()
            if node.val < low:
                if node.right is not None:
                    stack.append(node.right)
            elif node.val > high:
                if node.left is not None:
                    stack.append(node.left)
            else:
                total += node.val
                if node.left is not None:
                    stack.append(node.left)
                if node.right is not None:
                    stack.append(node.right)
        return total
