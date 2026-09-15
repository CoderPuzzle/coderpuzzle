func countUnivalSubtrees(root *TreeNode) int {
	count := 0
	// Post-order: each call reports whether the subtree rooted at `node` is
	// uni-value; every true is one more subtree for the count.
	var isUnival func(node *TreeNode) bool
	isUnival = func(node *TreeNode) bool {
		// The empty tree is vacuously uni-value: an absent child never breaks
		// its parent. It is never counted, so root == nil yields 0.
		if node == nil {
			return true
		}
		// Visit both children unconditionally: counting happens inside the
		// recursion, and a skipped branch would skip its own subtrees.
		left := isUnival(node.Left)
		right := isUnival(node.Right)
		uni := left && right &&
			(node.Left == nil || node.Left.Val == node.Val) &&
			(node.Right == nil || node.Right.Val == node.Val)
		if uni {
			count++
		}
		return uni
	}
	isUnival(root)
	return count
}
