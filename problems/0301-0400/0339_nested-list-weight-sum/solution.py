class Solution:
    def depthSum(self, nestedList):
        def walk(node, depth):
            if node.isInteger():
                return node.getInteger() * depth
            return sum(walk(child, depth + 1) for child in node.getList())

        return sum(walk(item, 1) for item in nestedList.getList())
