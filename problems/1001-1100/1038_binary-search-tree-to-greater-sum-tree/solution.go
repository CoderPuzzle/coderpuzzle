func bstToGst(root *TreeNode) *TreeNode {
	// Running sum of every value the reverse in-order has visited.
	total := 0
	reverseInorder(root, &total)
	return root
}

func reverseInorder(current *TreeNode, total *int) {
	if current == nil {
		return
	}
	// Right subtree first: reversed in-order walks keys largest to smallest.
	reverseInorder(current.Right, total)
	// On arrival every strictly greater key is already in `total`, so
	// the overwrite yields this key plus the sum of all greater keys.
	*total += current.Val
	current.Val = *total
	// Left subtree sees the accumulated total of all larger values.
	reverseInorder(current.Left, total)
}
