from typing import List, Optional


class Solution:
    def lowestCommonAncestor(self, root: Optional[TreeNode], p: int, q: int) -> int:
        # Plain descent, no stack or parent pointers: two comparisons per
        # level decide which side both targets lie on.
        node = root
        while node:
            if p < node.val and q < node.val:
                node = node.left
            elif p > node.val and q > node.val:
                node = node.right
            else:
                # First node where the targets split sides (or equals one of
                # them): every strict ancestor keeps both in one subtree.
                return node.val
        return -1
