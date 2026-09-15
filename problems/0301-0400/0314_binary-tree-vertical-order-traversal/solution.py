from collections import deque
from typing import List, Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def verticalOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if root is None:
            return []
        # (node, column) pairs advance level by level: dequeue order is
        # top-to-bottom, and within a row left-to-right — exactly the
        # ordering the answer needs, so appending as we dequeue is enough.
        columns = {}
        queue = deque([(root, 0)])
        leftmost = 0
        rightmost = 0
        while queue:
            node, column = queue.popleft()
            columns.setdefault(column, []).append(node.val)
            leftmost = min(leftmost, column)
            rightmost = max(rightmost, column)
            if node.left is not None:
                queue.append((node.left, column - 1))
            if node.right is not None:
                queue.append((node.right, column + 1))
        # The visited columns form one contiguous range (columns only ever
        # move by one), so the minimum-to-maximum sweep misses nothing.
        return [columns[column] for column in range(leftmost, rightmost + 1)]
