func countNodes(root *TreeNode) int {
	// Count every node the plain way: run down each left spine, then pop
	// back for the right turns. The stack holds one node per level.
	count := 0
	stack := []*TreeNode{}
	node := root
	for node != nil || len(stack) > 0 {
		for node != nil {
			count++
			stack = append(stack, node)
			node = node.Left
		}
		node = stack[len(stack)-1].Right
		stack = stack[:len(stack)-1]
	}
	return count
}
