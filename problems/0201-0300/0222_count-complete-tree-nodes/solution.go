func countNodes(root *TreeNode) int {
	var depth func(node *TreeNode, left bool) int
	depth = func(node *TreeNode, left bool) int {
		// Walk one spine (all-left or all-right) to measure its depth.
		d := 0
		for node != nil {
			d++
			if left {
				node = node.Left
			} else {
				node = node.Right
			}
		}
		return d
	}

	if root == nil {
		return 0
	}
	leftDepth := depth(root, true)
	rightDepth := depth(root, false)
	// Equal spine depths => the subtree is perfect: count it in closed
	// form, 2^d - 1, with no per-node traversal.
	if leftDepth == rightDepth {
		return (1 << uint(leftDepth)) - 1
	}
	// Ragged bottom: the missing nodes sit against the right side, so at
	// least one child is itself perfect and only the other recurses.
	return 1 + countNodes(root.Left) + countNodes(root.Right)
}
