class Solution:
    def postorder(self, root):
        if root is None:
            return []
        out = []
        stack = [[root, 0]]
        while stack:
            node, index = stack[-1]
            if index < len(node.children):
                stack[-1][1] += 1
                stack.append([node.children[index], 0])
            else:
                out.append(node.val)
                stack.pop()
        return out
