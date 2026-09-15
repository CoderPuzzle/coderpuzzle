from typing import List, Optional


class Solution:
    def getLonelyNodes(self, root: Optional[TreeNode]) -> List[int]:
        result: List[int] = []
        if root is None:
            return result
        # Explicit stack: a 1000-deep chain must not recurse.
        stack = [root]
        while stack:
            node = stack.pop()
            left, right = node.left, node.right
            if left is not None and right is None:
                result.append(left.val)
            elif right is not None and left is None:
                result.append(right.val)
            if left is not None:
                stack.append(left)
            if right is not None:
                stack.append(right)
        return result
