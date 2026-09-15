func constructMaximumBinaryTree(nums []int) *TreeNode {
	// The half-built tree's right spine holds exactly the still-open
	// maxima — values strictly decreasing from the root down — so it
	// lives on a stack. A new value dominates every smaller top: each
	// popped subtree is finished and can only hang left of it, and the
	// last one out (the run's largest) is its left child.
	stack := []*TreeNode{}
	for _, value := range nums {
		node := &TreeNode{Val: value}
		var last *TreeNode
		for len(stack) > 0 && stack[len(stack)-1].Val < value {
			last = stack[len(stack)-1]
			stack = stack[:len(stack)-1]
		}
		node.Left = last
		if len(stack) > 0 {
			// Whatever survives is larger, so the new node is its right
			// child — this link is rewritten only after the previous
			// child was popped and re-hung one level down.
			stack[len(stack)-1].Right = node
		}
		stack = append(stack, node)
	}
	// The bottom of the stack is the largest value ever seen: the root.
	return stack[0]
}
