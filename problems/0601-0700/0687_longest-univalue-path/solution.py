from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def longestUnivaluePath(self, root: Optional[TreeNode]) -> int:
        # A same-value path reaches some highest node and falls into at
        # most two arms, so every node can summarize its subtree in one
        # number: the length, in edges, of the longest downward path of
        # its own value leaving it. Arms are settled children-first and a
        # running maximum over all bend points — the sum of a node's two
        # arms — is the answer. The walk carries its own stack: the
        # constraints allow a 1000-deep same-value chain, and recursion
        # would nest a thousand frames — past CPython's default limit and
        # over the 512k stacks the judge hands Java and Node.
        order = []
        stack = [root] if root is not None else []
        while stack:
            node = stack.pop()
            order.append(node)
            if node.left is not None:
                stack.append(node.left)
            if node.right is not None:
                stack.append(node.right)

        # Pre-order collection puts every parent before its descendants,
        # so the reversed walk is post-order: a node's children's arms are
        # always already in the map when it looks them up.
        arms = {}
        best = 0
        for node in reversed(order):
            left = arms[node.left] + 1 if node.left is not None and node.left.val == node.val else 0
            right = arms[node.right] + 1 if node.right is not None and node.right.val == node.val else 0
            arms[node] = max(left, right)
            if left + right > best:
                best = left + right
        return best
