func addOneRow(root *TreeNode, val int, depth int) *TreeNode {
	if depth == 1 {
		// There is no depth 0 to splice under: the whole original tree
		// slips one level down as a fresh root's left subtree.
		fresh := &TreeNode{Val: val}
		fresh.Left = root
		return fresh
	}
	// The insertion row sits at a fixed depth, so the work is only reaching
	// it: a frontier starts at the root and steps down one level per round —
	// non-nil children only — until it holds exactly the nodes at depth - 1,
	// the splice points. The frontier walk iterates so a single 10^4-node
	// chain never strains the goroutine call stack.
	row := []*TreeNode{root}
	for level := 1; level < depth-1; level++ {
		next := make([]*TreeNode, 0, len(row)*2)
		for _, node := range row {
			if node.Left != nil {
				next = append(next, node.Left)
			}
			if node.Right != nil {
				next = append(next, node.Right)
			}
		}
		row = next
	}
	for _, node := range row {
		// Re-parent, never rebuild: each old subtree stays whole, merely
		// one level deeper under its fresh val node.
		node.Left = &TreeNode{Val: val, Left: node.Left}
		node.Right = &TreeNode{Val: val, Right: node.Right}
	}
	return root
}
