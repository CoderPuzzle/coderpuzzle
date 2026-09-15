func minDepth(root *TreeNode) int {
	// Loop invariant: `frontier` holds exactly one level's nodes, and every
	// node above them is internal, so the first leaf met in level order
	// sits at the minimum depth.
	if root == nil {
		return 0
	}
	depth := 0
	frontier := []*TreeNode{root}
	for len(frontier) > 0 {
		depth++
		next := []*TreeNode{}
		for _, node := range frontier {
			if node.Left == nil && node.Right == nil {
				// A leaf at this depth ends the search: BFS never visits
				// below the minimum depth, which is the point.
				return depth
			}
			if node.Left != nil {
				next = append(next, node.Left)
			}
			if node.Right != nil {
				next = append(next, node.Right)
			}
		}
		frontier = next
	}
	return depth
}
