from typing import List, Optional


class Solution:
    def bstFromPreorder(self, preorder: List[int]) -> Optional[TreeNode]:
        index = 0

        def build(low, high):
            nonlocal index
            if index == len(preorder):
                return None
            value = preorder[index]
            # outside this subtree's bounds: the value belongs to some
            # ancestor's right subtree — peek but do not consume
            if value < low or value > high:
                return None
            index += 1
            node = TreeNode(value)
            # preorder emits root, then the whole left subtree, then the
            # right one, so claiming left first matches the array order
            node.left = build(low, value - 1)
            node.right = build(value + 1, high)
            return node

        return build(float("-inf"), float("inf"))
