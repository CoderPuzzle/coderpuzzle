func balanceBST(root *TreeNode) *TreeNode {
	// phase 1: iterative in-order walk flattens the BST into sorted
	// values (explicit stack dodges recursion limits on chain inputs)
	values := []int{}
	stack := []*TreeNode{}
	current := root
	for len(stack) > 0 || current != nil {
		for current != nil {
			stack = append(stack, current)
			current = current.Left
		}
		current = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		values = append(values, current.Val)
		current = current.Right
	}

	// midpoint as root leaves at most half the range per side, so subtree
	// depths differ by <= 1 (build recursion is O(log n) deep)
	var build func(lo, hi int) *TreeNode
	build = func(lo, hi int) *TreeNode {
		if lo > hi {
			return nil
		}
		mid := lo + (hi-lo)/2
		node := &TreeNode{Val: values[mid]}
		node.Left = build(lo, mid-1)
		node.Right = build(mid+1, hi)
		return node
	}

	return build(0, len(values)-1)
}
