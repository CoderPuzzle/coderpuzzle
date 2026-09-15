func preorderTraversal(root *TreeNode) []int {
	result := []int{}
	if root == nil {
		return result
	}
	stack := []*TreeNode{root}
	// Loop invariant: `stack` holds exactly the discovered-but-unvisited
	// nodes, in the order preorder wants them next.
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		// Preorder visits a node before either of its subtrees.
		result = append(result, node.Val)
		// Push right before left: the stack pops from the top, so the left
		// child (and its entire subtree) is traversed first.
		if node.Right != nil {
			stack = append(stack, node.Right)
		}
		if node.Left != nil {
			stack = append(stack, node.Left)
		}
	}
	return result
}
