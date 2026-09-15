func heightOfTree(root *TreeNode) int {
	if root == nil {
		return 0
	}
	return height(root)
}

// isLeaf reports whether node is a leaf of the special tree: the ring
// gives every leaf both children, and the previous leaf's right child
// points back at the leaf itself.
func isLeaf(node *TreeNode) bool {
	return node.Left != nil && node.Left.Right == node
}

// height returns the subtree's height -- its longest downward path in
// edges -- stopping at the ring-wired leaves.
func height(node *TreeNode) int {
	if node == nil || isLeaf(node) {
		return 0
	}
	left, right := 0, 0
	if node.Left != nil {
		left = height(node.Left)
	}
	if node.Right != nil {
		right = height(node.Right)
	}
	return 1 + max(left, right)
}
