func goodNodes(root *TreeNode) int {
	return dfs(root, root.Val)
}

// maxSoFar is the largest value on the current root path
func dfs(node *TreeNode, maxSoFar int) int {
	if node == nil {
		return 0
	}
	count := 0
	// non-strict: a value equal to the path max is still good; raising
	// maxSoFar here means children see the true maximum of their path
	if node.Val >= maxSoFar {
		count = 1
		maxSoFar = node.Val
	}
	return count + dfs(node.Left, maxSoFar) + dfs(node.Right, maxSoFar)
}
