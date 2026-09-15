class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def lowestCommonAncestor(self, root: TreeNode, p: int, q: int) -> int:
        # One walk over the tree records every node's parent. Values are
        # unique, so a value identifies its node; the root records none.
        parent = {}
        stack = [root]
        while stack:
            node = stack.pop()
            for child in (node.left, node.right):
                if child is not None:
                    parent[child.val] = node.val
                    stack.append(child)
        # Every node on the root-to-p chain, p and root included, is a
        # shared ancestor candidate: it is an ancestor of p by construction.
        ancestors = set()
        value = p
        while value is not None:
            ancestors.add(value)
            value = parent.get(value)
        # Climb from q: the first candidate met is the deepest node whose
        # subtree covers both targets.
        value = q
        while value not in ancestors:
            value = parent[value]
        return value
