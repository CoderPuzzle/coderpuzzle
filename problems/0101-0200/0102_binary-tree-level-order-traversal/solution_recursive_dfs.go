func levelOrder(root *TreeNode) [][]int {
	// One list per depth, appended to the first time the walk reaches that
	// depth; afterwards it already exists for every later arrival.
	grouped := [][]int{}
	var visit func(node *TreeNode, depth int)
	visit = func(node *TreeNode, depth int) {
		// Pre-order: record the value before descending, so arrivals at
		// each depth happen left to right.
		if len(grouped) == depth {
			grouped = append(grouped, []int{})
		}
		grouped[depth] = append(grouped[depth], node.Val)
		if node.Left != nil {
			visit(node.Left, depth+1)
		}
		if node.Right != nil {
			visit(node.Right, depth+1)
		}
	}
	if root != nil {
		visit(root, 0)
	}
	return grouped
}
