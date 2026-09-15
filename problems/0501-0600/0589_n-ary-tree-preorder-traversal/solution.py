class Solution:
    def preorder(self, root):
        if root is None:
            return []
        out = []
        stack = [root]
        while stack:
            node = stack.pop()
            out.append(node.val)
            stack.extend(reversed(node.children))
        return out
