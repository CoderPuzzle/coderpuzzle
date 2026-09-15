func maxDepth(root *TreeNode) int {
	// Loop invariant: `level` holds exactly one level's nodes, so one full
	// round of rebuilding it counts exactly one level of depth.
	depth := 0
	level := []*TreeNode{}
	if root != nil {
		level = append(level, root)
	}
	for len(level) > 0 {
		depth++
		// Collect only the real children, so nodes of two levels never mix
		// inside one frontier and a leaf contributes nothing.
		next := []*TreeNode{}
		for _, node := range level {
			if node.Left != nil {
				next = append(next, node.Left)
			}
			if node.Right != nil {
				next = append(next, node.Right)
			}
		}
		level = next
	}
	return depth
}
