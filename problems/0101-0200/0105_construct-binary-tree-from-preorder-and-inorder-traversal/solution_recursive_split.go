func buildTree(preorder []int, inorder []int) *TreeNode {
	// Value -> inorder index: makes each split lookup O(1) instead of a
	// linear scan. Values are unique, so a hit is exactly one split point.
	index := make(map[int]int)
	for i, v := range inorder {
		index[v] = i
	}
	// Single shared cursor consuming preorder strictly left to right,
	// one value per recursive call (captured by the closure).
	position := 0

	var build func(low, high int) *TreeNode
	build = func(low, high int) *TreeNode {
		// Empty inorder range <=> missing child, so base cases need no
		// special casing.
		if low >= high {
			return nil
		}
		// The first unconsumed preorder value is the root of this subtree:
		// preorder lists root, then the whole left subtree, then the right
		// -- exactly the order the recursion asks for root values.
		value := preorder[position]
		position++
		node := &TreeNode{Val: value}
		mid := index[value]
		// Inorder visits left, root, right: [low, mid) is the left
		// subtree and [mid + 1, high) the right.
		node.Left = build(low, mid)
		node.Right = build(mid+1, high)
		return node
	}

	return build(0, len(inorder))
}
