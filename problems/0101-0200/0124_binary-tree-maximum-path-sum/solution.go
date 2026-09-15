func maxPathSum(root *TreeNode) int {
	// A path must contain at least one node, so start effectively at -inf.
	best := int64(1) << 62
	best = -best
	gain(root, &best)
	return int(best)
}

// gain returns the best path that starts at node and descends into at most
// one child.
func gain(node *TreeNode, best *int64) int64 {
	if node == nil {
		return 0
	}
	// Clamp each child's gain at 0: a negative branch is better left unvisited.
	left := gain(node.Left, best)
	if left < 0 {
		left = 0
	}
	right := gain(node.Right, best)
	if right < 0 {
		right = 0
	}
	// The path bending through this node is a candidate for the global answer.
	total := int64(node.Val) + left + right
	if total > *best {
		*best = total
	}
	// The parent may only extend the path through one side.
	single := int64(node.Val) + left
	if right > left {
		single = int64(node.Val) + right
	}
	return single
}
