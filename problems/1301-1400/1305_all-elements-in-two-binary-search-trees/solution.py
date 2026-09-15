from typing import List, Optional


class Solution:
    def getAllElements(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> List[int]:
        # Each tree is a BST, so an iterative in-order walk (explicit stack,
        # safe for a 5000-node skewed tree) yields its values sorted. Then a
        # standard two-way merge combines the two sorted lists in one pass.
        def inorder(root):
            values = []
            stack = []
            node = root
            while stack or node is not None:
                while node is not None:
                    stack.append(node)
                    node = node.left
                node = stack.pop()
                values.append(node.val)
                node = node.right
            return values

        first = inorder(root1)
        second = inorder(root2)
        merged = []
        i = j = 0
        while i < len(first) and j < len(second):
            if first[i] <= second[j]:
                merged.append(first[i])
                i += 1
            else:
                merged.append(second[j])
                j += 1
        merged.extend(first[i:])
        merged.extend(second[j:])
        return merged
