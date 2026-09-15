from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def sumRootToLeaf(self, root: Optional[TreeNode]) -> int:
        # The node range [1, 1000] guarantees a root, so the walk starts at
        # the first bit with no empty-tree case. Python's int is
        # arbitrary-precision, so the running value never risks overflow no
        # matter how deep the walk runs before a leaf is reached.
        total = 0
        # Loop invariant: the stack holds (node, running) pairs where
        # running is the value formed by the bits from the root down to
        # (but excluding) `node`; appending node.val extends it by one bit.
        stack = [(root, 0)]
        while stack:
            node, running = stack.pop()
            value = running * 2 + node.val
            if node.left is None and node.right is None:
                # The path ends here, so its value is complete and joins
                # the total — the only place a value is ever summed.
                total += value
            else:
                # An internal node never sums on its own: its bit only
                # matters inside the values of the leaves below it.
                for child in (node.left, node.right):
                    if child is not None:
                        stack.append((child, value))
        return total
