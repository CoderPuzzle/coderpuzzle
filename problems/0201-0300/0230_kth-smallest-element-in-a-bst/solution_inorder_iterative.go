func kthSmallest(root *TreeNode, k int) int {
	// In-order traversal of a BST visits values in ascending order, so the
	// kth visit is the kth smallest. The explicit stack simulates the
	// recursion, keeping space proportional to the tree height.
	var stack []*TreeNode
	node := root
	for node != nil || len(stack) > 0 {
		// Push and descend the left spine as far as possible.
		for node != nil {
			stack = append(stack, node)
			node = node.Left
		}
		// Left spine exhausted: popping is the "visit".
		node = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		k--
		// Early stop: the unvisited remainder is never touched.
		if k == 0 {
			return node.Val
		}
		node = node.Right
	}
	return -1
}
