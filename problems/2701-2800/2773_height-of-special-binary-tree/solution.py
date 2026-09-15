class Solution:
    def heightOfTree(self, root):
        # A leaf of the special tree is the one node the display cannot
        # mark: the ring gives every leaf both children, and the previous
        # leaf's right child points back at the leaf itself.
        def is_leaf(node):
            return node.left is not None and node.left.right is node

        # Returns the subtree's height -- its longest downward path in
        # edges -- stopping at the ring-wired leaves.
        def height(node):
            if node is None or is_leaf(node):
                return 0
            return 1 + max(height(node.left), height(node.right))

        if root is None:
            return 0
        return height(root)
