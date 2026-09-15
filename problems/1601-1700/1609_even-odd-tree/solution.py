from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def isEvenOddTree(self, root: TreeNode | None) -> bool:
        if root is None:
            return True
        level = 0
        queue = deque([root])
        while queue:
            prev = None
            for _ in range(len(queue)):
                node = queue.popleft()
                if level % 2 == 0:
                    if node.val % 2 == 0 or (prev is not None and node.val <= prev):
                        return False
                else:
                    if node.val % 2 != 0 or (prev is not None and node.val >= prev):
                        return False
                prev = node.val
                if node.left is not None:
                    queue.append(node.left)
                if node.right is not None:
                    queue.append(node.right)
            level += 1
        return True
