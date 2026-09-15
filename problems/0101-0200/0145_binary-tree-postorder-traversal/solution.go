func postorderTraversal(root *TreeNode) []int {
	result := []int{}
	if root == nil {
		return result
	}
	stack := []*TreeNode{root}
	// Loop invariant: `stack` holds nodes still to be expanded; each is
	// emitted the moment it is popped. Children are pushed left first, so
	// the right child is always expanded before the left one.
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		result = append(result, node.Val)
		// Left first, right on top: the emits so far read root, right, left
		// — preorder with the two children swapped.
		if node.Left != nil {
			stack = append(stack, node.Left)
		}
		if node.Right != nil {
			stack = append(stack, node.Right)
		}
	}
	// Root-right-left read backwards is left-right-root: postorder.
	for i, j := 0, len(result)-1; i < j; i, j = i+1, j-1 {
		result[i], result[j] = result[j], result[i]
	}
	return result
}
