from collections import deque
from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def widthOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        best = 0
        queue = deque([(root, 0)]) if root is not None else deque()
        while queue:
            # The queue holds exactly one level, in index order, so its
            # end nodes' indices give the level's width directly — the
            # null slots between them are counted by the arithmetic,
            # never materialized.
            width = queue[-1][1] - queue[0][1] + 1
            if width > best:
                best = width
            # Re-base before doubling: raw heap indices double per level
            # and blow past 64 bits on a deep chain. Shifted so the level
            # starts at 0, a stored index never exceeds twice the level's
            # width; a width is a difference within one level, and the
            # shift leaves every such difference unchanged.
            base = queue[0][1]
            for _ in range(len(queue)):
                node, index = queue.popleft()
                index -= base
                if node.left is not None:
                    queue.append((node.left, 2 * index))
                if node.right is not None:
                    queue.append((node.right, 2 * index + 1))
        return best
