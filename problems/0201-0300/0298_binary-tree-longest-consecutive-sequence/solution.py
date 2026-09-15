from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def longestConsecutive(self, root: Optional[TreeNode]) -> int:
        # For every node, the consecutive run ending there is one longer
        # than its parent's run when the step is exactly +1, and 1 when it
        # is not; the answer is the maximum over all nodes. The traversal
        # carries its own stack: the tree may be a single 3*10^4-node chain,
        # whose run nests 30000 calls — past CPython's default recursion
        # limit and past several runtimes' call stacks outright.
        best = 0
        # Right children parked while the descent walks the left spine,
        # each with the run length already computed for it.
        pending = []
        node, length = root, 1
        while node is not None:
            if length > best:
                best = length
            if node.right is not None:
                # Extend into the right child, or restart the run there.
                step = node.right.val == node.val + 1
                pending.append((node.right, length + 1 if step else 1))
            if node.left is not None:
                # Descend left, extending or restarting the same way.
                step = node.left.val == node.val + 1
                length = length + 1 if step else 1
                node = node.left
            elif pending:
                node, length = pending.pop()
            else:
                node = None
        return best
