func inorderTraversal(root *TreeNode) []int {
	result := []int{}
	stack := []*TreeNode{}
	node := root
	// Loop invariant: `stack` holds the ancestors whose left subtrees are
	// still being descended into; `node` is the next subtree to process
	// (nil means it is time to pop back up instead).
	for node != nil || len(stack) > 0 {
		// Descend the left spine, remembering every node on it.
		for node != nil {
			stack = append(stack, node)
			node = node.Left
		}
		// The stack top is now the leftmost unvisited node of the current
		// subtree — the next value in inorder order.
		node = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		result = append(result, node.Val)
		// The popped node's left subtree is done; traverse its right
		// subtree in full before any ancestor below it is visited.
		node = node.Right
	}
	return result
}
