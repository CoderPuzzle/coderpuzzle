from typing import Optional


class Solution:
    def sumEvenGrandparent(self, root: Optional[TreeNode]) -> int:
        # Each stack entry carries (node, parent value, grandparent value) so
        # the parity test needs no upward links. Explicit stack: the tree may
        # be a 10^4-node chain, beyond any recursion budget.
        NONE = 1  # odd sentinel: contributes nothing (1 is odd)
        total = 0
        stack = [(root, NONE, NONE)]
        while stack:
            node, parent, grandparent = stack.pop()
            if node is None:
                continue
            if grandparent % 2 == 0:
                total += node.val
            stack.append((node.left, node.val, parent))
            stack.append((node.right, node.val, parent))
        return total
