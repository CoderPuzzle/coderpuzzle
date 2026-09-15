func intersect(quadTree1 *QuadNode, quadTree2 *QuadNode) *QuadNode {
	if quadTree1.IsLeaf {
		if quadTree1.Val {
			return quadTree1
		}
		return quadTree2
	}
	if quadTree2.IsLeaf {
		if quadTree2.Val {
			return quadTree2
		}
		return quadTree1
	}
	node := &QuadNode{}
	node.TopLeft = intersect(quadTree1.TopLeft, quadTree2.TopLeft)
	node.TopRight = intersect(quadTree1.TopRight, quadTree2.TopRight)
	node.BottomLeft = intersect(quadTree1.BottomLeft, quadTree2.BottomLeft)
	node.BottomRight = intersect(quadTree1.BottomRight, quadTree2.BottomRight)
	children := []*QuadNode{node.TopLeft, node.TopRight, node.BottomLeft, node.BottomRight}
	uniform := true
	for _, child := range children {
		if !child.IsLeaf || child.Val != node.TopLeft.Val {
			uniform = false
			break
		}
	}
	if uniform {
		return &QuadNode{Val: node.TopLeft.Val, IsLeaf: true}
	}
	return node
}
