func kthSmallest(root *TreeNode, k int) int {
	// In-order traversal of a BST visits values in ascending order, so the
	// kth visit is the kth smallest. k counts down inside the closure; the
	// visit that zeroes it records the answer.
	answer := -1
	var walk func(*TreeNode)
	walk = func(node *TreeNode) {
		// Early stop: once the answer is recorded, the unvisited
		// remainder of the tree is never touched.
		if node == nil || k == 0 {
			return
		}
		walk(node.Left)
		k--
		if k == 0 {
			answer = node.Val
			return
		}
		walk(node.Right)
	}
	// Recursion depth is bounded by the tree height h (worst case n on a
	// chain), which is why the iterative twin exists.
	walk(root)
	return answer
}
