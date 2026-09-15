func getMinimumDifference(root *TreeNode) int {
	// An inorder walk of a BST emits values in ascending order, and a
	// sorted sequence keeps its closest pair next to each other: for any
	// two values with a third between them, that middle value is closer to
	// one end than the outer pair is wide. The minimum absolute difference
	// is therefore always a gap between consecutively visited values, and
	// one pass holding just the previously emitted value sees every
	// candidate. The traversal carries its own stack of nodes so a single
	// 10^4-node chain never strains the goroutine call stack.
	// Larger than any real gap (values fit in [0, 10^5]); at least two
	// nodes exist, so the first measured pair always replaces it.
	best := int(^uint(0) >> 1)
	prev := 0
	started := false
	stack := []*TreeNode{}
	current := root
	for current != nil || len(stack) > 0 {
		// Descend the left spine stacking every node, then visit each
		// popped node and descend its right child.
		for current != nil {
			stack = append(stack, current)
			current = current.Left
		}
		current = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if started && current.Val-prev < best {
			best = current.Val - prev
		}
		started = true
		prev = current.Val
		current = current.Right
	}
	return best
}
