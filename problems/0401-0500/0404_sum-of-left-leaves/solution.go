func sumOfLeftLeaves(root *TreeNode) int {
	// Pre-order carrying each node's side: when the walk enters a leaf it
	// already knows whether that leaf is the left child of another node, so
	// its value is settled on the spot and no parent is revisited. The root
	// is nobody's child, so it enters flagged as a right child.
	var collect func(node *TreeNode, isLeft bool) int
	collect = func(node *TreeNode, isLeft bool) int {
		if node == nil {
			return 0
		}
		// A leaf contributes only when it hangs off a parent's left.
		if node.Left == nil && node.Right == nil {
			if isLeft {
				return node.Val
			}
			return 0
		}
		return collect(node.Left, true) + collect(node.Right, false)
	}
	return collect(root, false)
}
