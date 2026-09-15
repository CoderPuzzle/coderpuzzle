class NodeWithNext:
    """Binary-tree node with the level ``next`` link (and the ``parent``
    back-pointer the in-order-successor wire needs)."""

    def __init__(self, val=0, left=None, right=None, next=None, parent=None):
        self.val = val
        self.left = left
        self.right = right
        self.next = next
        self.parent = parent


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
