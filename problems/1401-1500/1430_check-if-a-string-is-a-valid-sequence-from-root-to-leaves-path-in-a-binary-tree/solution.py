from typing import List, Optional


class Solution:
    def isValidSequence(self, root: Optional[TreeNode], arr: List[int]) -> bool:
        if root is None:
            return False
        n = len(arr)
        # Explicit stack of (node, index): a chain thousands deep must not
        # recurse, so the walk keeps its own frame list.
        stack = [(root, 0)]
        while stack:
            node, i = stack.pop()
            if node.val != arr[i]:
                continue
            if i == n - 1:
                # The array is consumed: valid only at a leaf.
                if node.left is None and node.right is None:
                    return True
                continue
            if node.left is not None:
                stack.append((node.left, i + 1))
            if node.right is not None:
                stack.append((node.right, i + 1))
        return False
