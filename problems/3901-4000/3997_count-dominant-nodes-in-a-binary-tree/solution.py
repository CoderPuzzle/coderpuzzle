class Solution:
    def countDominantNodes(self, root):
        def go(node):
            if node is None:
                return (-1, 0)
            a, x = go(node.left)
            b, y = go(node.right)
            m = max(node.val, a, b)
            return (m, x + y + (node.val == m))

        return go(root)[1]
