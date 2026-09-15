from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def widthOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        best = 0
        # Depth -> (leftmost, rightmost) frame positions seen at that
        # depth — the two running extremes; the null slots between the
        # end nodes are counted by the arithmetic, never materialized.
        extremes = {}
        # A list used as a stack. Popping the last entry, and pushing the
        # right child before the left, walks the tree root-first, left
        # subtree before right — preorder, which visits every depth in
        # index order.
        stack = [(root, 0, 0)] if root is not None else []
        while stack:
            node, depth, pos = stack.pop()
            lo, hi = extremes.get(depth, (pos, pos))
            if pos < lo:
                lo = pos
            if pos > hi:
                hi = pos
            extremes[depth] = (lo, hi)
            width = hi - lo + 1
            if width > best:
                best = width
            # Re-base before doubling: raw heap indices double per level
            # and blow past 64 bits on a deep chain. Shifted so the level
            # starts at its leftmost node, a stored index never exceeds
            # twice the level's width; a width is a difference within one
            # level, and the shift leaves every such difference unchanged.
            rebased = pos - lo
            if node.right is not None:
                stack.append((node.right, depth + 1, 2 * rebased + 1))
            if node.left is not None:
                stack.append((node.left, depth + 1, 2 * rebased))
        return best
