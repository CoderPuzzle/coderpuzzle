class Solution:
    def maxDepth(self, root):
        if root is None:
            return 0
        depth = 0
        level = [root]
        while level:
            depth += 1
            level = [child for node in level for child in node.children]
        return depth
