class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def countNodes(self, root: TreeNode | None) -> int:
        # Count every node the plain way: run down each left spine, then
        # pop back for the right turns. The stack holds one node per level.
        count = 0
        stack = []
        node = root
        while node is not None or stack:
            while node is not None:
                count += 1
                stack.append(node)
                node = node.left
            node = stack.pop().right
        return count
