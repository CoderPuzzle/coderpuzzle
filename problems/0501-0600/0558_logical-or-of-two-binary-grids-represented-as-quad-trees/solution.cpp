class Solution {
  public:
    QuadNode *intersect(QuadNode *quadTree1, QuadNode *quadTree2) {
        if (quadTree1->isLeaf)
            return quadTree1->val ? quadTree1 : quadTree2;
        if (quadTree2->isLeaf)
            return quadTree2->val ? quadTree2 : quadTree1;
        QuadNode *node = new QuadNode(false, false);
        node->topLeft = intersect(quadTree1->topLeft, quadTree2->topLeft);
        node->topRight = intersect(quadTree1->topRight, quadTree2->topRight);
        node->bottomLeft = intersect(quadTree1->bottomLeft, quadTree2->bottomLeft);
        node->bottomRight = intersect(quadTree1->bottomRight, quadTree2->bottomRight);
        if (node->topLeft->isLeaf && node->topRight->isLeaf && node->bottomLeft->isLeaf && node->bottomRight->isLeaf &&
            node->topLeft->val == node->topRight->val && node->topRight->val == node->bottomLeft->val &&
            node->bottomLeft->val == node->bottomRight->val) {
            return new QuadNode(node->topLeft->val, true);
        }
        return node;
    }
};
