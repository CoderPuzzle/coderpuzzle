class Solution:
    def levelOrder(self, root):
        if root is None:
            return []
        result = []
        level = [root]
        while level:
            result.append([node.val for node in level])
            level = [child for node in level for child in node.children]
        return result
