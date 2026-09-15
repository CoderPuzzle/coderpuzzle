from typing import List, Optional


class Solution:
    def twoSumBSTs(self, root1: Optional[TreeNode], root2: Optional[TreeNode], target: int) -> bool:
        def inorder(root: Optional[TreeNode]) -> List[int]:
            # Iterative in-order: a degenerate 5000-node tree would recurse
            # past the smallest judged stacks.
            values, stack, node = [], [], root
            while stack or node is not None:
                while node is not None:
                    stack.append(node)
                    node = node.left
                node = stack.pop()
                values.append(node.val)
                node = node.right
            return values

        a = inorder(root1)
        b = inorder(root2)
        i, j = 0, len(b) - 1
        while i < len(a) and j >= 0:
            total = a[i] + b[j]
            if total == target:
                return True
            if total < target:
                i += 1
            else:
                j -= 1
        return False
