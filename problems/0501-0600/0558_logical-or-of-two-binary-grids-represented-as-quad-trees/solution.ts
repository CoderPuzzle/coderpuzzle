function intersect(quadTree1: QuadNode, quadTree2: QuadNode): QuadNode {
    if (quadTree1.isLeaf) return quadTree1.val ? quadTree1 : quadTree2;
    if (quadTree2.isLeaf) return quadTree2.val ? quadTree2 : quadTree1;
    const node = new QuadNode(false, false);
    node.topLeft = intersect(quadTree1.topLeft!, quadTree2.topLeft!);
    node.topRight = intersect(quadTree1.topRight!, quadTree2.topRight!);
    node.bottomLeft = intersect(quadTree1.bottomLeft!, quadTree2.bottomLeft!);
    node.bottomRight = intersect(quadTree1.bottomRight!, quadTree2.bottomRight!);
    const children = [node.topLeft!, node.topRight!, node.bottomLeft!, node.bottomRight!];
    if (children.every((child) => child.isLeaf && child.val === node.topLeft!.val)) {
        return new QuadNode(node.topLeft!.val, true);
    }
    return node;
}
