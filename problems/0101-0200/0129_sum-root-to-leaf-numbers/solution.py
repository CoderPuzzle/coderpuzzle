from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        total = 0
        # The node range [1, 1000] guarantees a root, so the walk starts at
        # the first digit with no empty-tree case.
        # Loop invariant: the stack holds (node, prefix) pairs where prefix
        # is the number formed by the digits from the root down to (but
        # excluding) `node`; appending node.val extends it by one digit.
        stack = [(root, 0)]
        while stack:
            node, prefix = stack.pop()
            number = prefix * 10 + node.val
            if node.left is None and node.right is None:
                # The path ends here, so its number is complete and joins
                # the total — the only place a value is ever summed.
                total += number
            else:
                # An internal node never sums on its own: its digit only
                # matters inside the numbers of the leaves below it.
                for child in (node.left, node.right):
                    if child is not None:
                        stack.append((child, number))
        return total
