from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def tree2str(self, root: Optional[TreeNode]) -> str:
        # The answer is a preorder walk written under two paren rules: a node
        # with any child opens a group for it, and a group is dropped only
        # when the child is absent — except that an absent left child beside
        # a present right one leaves its "()" placeholder so the two groups
        # stay tell-apart. The stack interleaves those literal parens with
        # the pending nodes in exactly the order they must be written, so one
        # pop-and-emit loop produces the whole string.
        # Iterative on purpose: the 10'000-node chain the constraints allow
        # nests ten times past CPython's default recursion limit and past the
        # small stacks the judge hands the managed runtimes; the explicit
        # stack is one entry per pending node or paren and never nests a call.
        parts = []
        stack = [root]  # TreeNodes and the literal "(" / ")" markers
        while stack:
            item = stack.pop()
            if isinstance(item, str):
                parts.append(item)
                continue
            parts.append(str(item.val))
            left, right = item.left, item.right
            if left is not None or right is not None:
                if right is not None:
                    # The right group is written second, so it is pushed
                    # first and pops after the left group is finished.
                    stack.append(")")
                    stack.append(right)
                    stack.append("(")
                    if left is None:
                        # A right child with no left one: the empty pair
                        # marks where the left group would have been.
                        parts.append("()")
                if left is not None:
                    stack.append(")")
                    stack.append(left)
                    stack.append("(")
        return "".join(parts)
