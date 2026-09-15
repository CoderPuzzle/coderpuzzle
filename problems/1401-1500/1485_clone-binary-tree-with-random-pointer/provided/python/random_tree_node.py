"""Problem-provided tree node with a random pointer (LC 1485 contract)."""


class RandomTreeNode:
    def __init__(self, val=0, left=None, right=None, random=None):
        self.val = val
        self.left = left
        self.right = right
        self.random = random
