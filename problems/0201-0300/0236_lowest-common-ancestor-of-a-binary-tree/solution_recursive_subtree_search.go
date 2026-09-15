func lowestCommonAncestor(root *TreeNode, p int, q int) int {
	return find(root, p, q).Val
}

// find answers a narrower question per subtree: does it hold p or q?
// It returns the found target node itself, or nil if neither is there.
func find(node *TreeNode, p int, q int) *TreeNode {
	// A node counts as a descendant of itself, so a value match is
	// itself a successful find and we return immediately.
	if node == nil || node.Val == p || node.Val == q {
		return node
	}
	left := find(node.Left, p, q)
	right := find(node.Right, p, q)
	// Each side found a target: they meet at this node for the first
	// time — everything below saw at most one — so this is the answer.
	if left != nil && right != nil {
		return node
	}
	// Otherwise propagate the lone non-nil sighting upward.
	if left != nil {
		return left
	}
	return right
}
