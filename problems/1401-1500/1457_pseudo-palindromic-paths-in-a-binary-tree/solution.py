from typing import List, Optional, Tuple


class Solution:
    def pseudoPalindromicPaths(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0
        count = 0
        # Explicit stack: the tree may be a chain 10^5 deep, too deep for
        # recursion under the small run-time stacks.
        stack: List[Tuple[TreeNode, int]] = [(root, 1 << (root.val - 1))]
        while stack:
            node, mask = stack.pop()
            if node.left is None and node.right is None:
                # At most one set bit <=> at most one odd digit count.
                if mask & (mask - 1) == 0:
                    count += 1
                continue
            if node.left is not None:
                stack.append((node.left, mask ^ (1 << (node.left.val - 1))))
            if node.right is not None:
                stack.append((node.right, mask ^ (1 << (node.right.val - 1))))
        return count
