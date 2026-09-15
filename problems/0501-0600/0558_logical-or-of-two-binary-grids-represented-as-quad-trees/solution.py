class Solution:
    def intersect(self, quadTree1, quadTree2):
        if quadTree1.isLeaf:
            return quadTree1 if quadTree1.val else quadTree2
        if quadTree2.isLeaf:
            return quadTree2 if quadTree2.val else quadTree1
        node = QuadNode(False, False)
        node.topLeft = self.intersect(quadTree1.topLeft, quadTree2.topLeft)
        node.topRight = self.intersect(quadTree1.topRight, quadTree2.topRight)
        node.bottomLeft = self.intersect(quadTree1.bottomLeft, quadTree2.bottomLeft)
        node.bottomRight = self.intersect(quadTree1.bottomRight, quadTree2.bottomRight)
        if (
            node.topLeft.isLeaf
            and node.topRight.isLeaf
            and node.bottomLeft.isLeaf
            and node.bottomRight.isLeaf
            and node.topLeft.val == node.topRight.val == node.bottomLeft.val == node.bottomRight.val
        ):
            return QuadNode(node.topLeft.val, True)
        return node
