class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
