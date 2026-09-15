func bstFromPreorder(preorder []int) *TreeNode {
	index := 0
	return build(preorder, &index, -(1 << 62), 1<<62)
}

func build(preorder []int, index *int, low, high int64) *TreeNode {
	if *index == len(preorder) {
		return nil
	}
	value := preorder[*index]
	// outside this subtree's bounds: the value belongs to some
	// ancestor's right subtree — peek but do not consume
	if int64(value) < low || int64(value) > high {
		return nil
	}
	*index++
	node := &TreeNode{Val: value}
	// preorder emits root, then the whole left subtree, then the
	// right one, so claiming left first matches the array order
	node.Left = build(preorder, index, low, int64(value)-1)
	node.Right = build(preorder, index, int64(value)+1, high)
	return node
}
