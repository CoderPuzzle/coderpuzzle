from collections import defaultdict


class Solution:
    def createBinaryTree(self, descriptions: list[list[int]]) -> TreeNode | None:
        children = set()
        nodes = {}

        def get(value: int) -> TreeNode:
            if value not in nodes:
                nodes[value] = TreeNode(value)
            return nodes[value]

        for parent, child, is_left in descriptions:
            get(parent)
            node = get(child)
            children.add(child)
            if is_left:
                get(parent).left = node
            else:
                get(parent).right = node

        for value, node in nodes.items():
            if value not in children:
                return node
        return None
