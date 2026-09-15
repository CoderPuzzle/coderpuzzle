class Solution:
    def treeToDoublyList(self, root):
        values = []
        stack = []
        node = root
        while stack or node is not None:
            while node is not None:
                stack.append(node)
                node = node.left
            node = stack.pop()
            values.append(node.val)
            node = node.right
        nodes = [NodeWithNext(value) for value in values]
        for left, right in zip(nodes, nodes[1:]):
            left.right = right
            right.left = left
        if nodes:
            nodes[-1].right = nodes[0]
            nodes[0].left = nodes[-1]
            return nodes[0]
        return None
