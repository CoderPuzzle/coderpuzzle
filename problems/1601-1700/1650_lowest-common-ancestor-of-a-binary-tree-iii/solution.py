from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def lowestCommonAncestor(self, root: Optional[TreeNode], p: int, q: int) -> int:
        # The original hands p and q as node references that each carry a
        # .parent pointer, with no root given at all. Here the tree
        # arrives as root plus the two target values instead, so the
        # first step recovers what .parent would have given directly: one
        # iterative pre-order pass builds a value -> parent-value map.
        # Node values are unique, so a value is a safe, hashable key.
        parent_of = {root.val: None}
        stack = [root]
        while stack:
            node = stack.pop()
            if node.left is not None:
                parent_of[node.left.val] = node.val
                stack.append(node.left)
            if node.right is not None:
                parent_of[node.right.val] = node.val
                stack.append(node.right)
        # Walk p up to the root, collecting every value on that path —
        # exactly the "store the path from p" step the original hints at.
        ancestors = set()
        val = p
        while val is not None:
            ancestors.add(val)
            val = parent_of[val]
        # Walk q up until it lands on a value already seen from p; that is
        # the lowest shared ancestor. This also handles either target
        # already being the other's ancestor, since the starting value is
        # checked before climbing.
        val = q
        while val not in ancestors:
            val = parent_of[val]
        return val
