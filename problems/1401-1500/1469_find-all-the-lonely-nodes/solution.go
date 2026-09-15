func getLonelyNodes(root *TreeNode) []int {
	result := make([]int, 0)
	if root == nil {
		return result
	}
	// Explicit stack: a 1000-deep chain must not recurse.
	stack := []*TreeNode{root}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if node.Left != nil && node.Right == nil {
			result = append(result, node.Left.Val)
		} else if node.Right != nil && node.Left == nil {
			result = append(result, node.Right.Val)
		}
		if node.Left != nil {
			stack = append(stack, node.Left)
		}
		if node.Right != nil {
			stack = append(stack, node.Right)
		}
	}
	return result
}
