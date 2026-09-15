func lowestCommonAncestor(root *TreeNode, p int, q int) int {
	// Plain descent, no stack or parent pointers: two comparisons per
	// level decide which side both targets lie on.
	node := root
	for node != nil {
		if p < node.Val && q < node.Val {
			node = node.Left
		} else if p > node.Val && q > node.Val {
			node = node.Right
		} else {
			// First node where the targets split sides (or equals one of
			// them): every strict ancestor keeps both in one subtree.
			return node.Val
		}
	}
	return -1
}
