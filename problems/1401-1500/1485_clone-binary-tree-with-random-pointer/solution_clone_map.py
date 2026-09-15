import sys


class Solution:
    def copyRandomBinaryTree(self, root):
        # A 1000-node chain nests 1000 calls, past CPython's default
        # recursion limit; lift it so the plain recursion stays viable.
        sys.setrecursionlimit(10000)
        copies = {}

        def clone(node):
            if node is None:
                return None
            if node in copies:
                return copies[node]
            copy = RandomTreeNode(node.val)
            copies[node] = copy
            copy.left = clone(node.left)
            copy.right = clone(node.right)
            copy.random = clone(node.random)
            return copy

        return clone(root)
