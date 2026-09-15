func minCameraCover(root *TreeNode) int {
	cameras := 0

	// State: 0 = uncovered, 1 = has camera, 2 = covered.
	var dfs func(node *TreeNode) int
	dfs = func(node *TreeNode) int {
		if node == nil {
			// Null reports covered so leaves start uncovered and push
			// the first camera one level up.
			return 2
		}
		left := dfs(node.Left)
		right := dfs(node.Right)
		if left == 0 || right == 0 {
			// An uncovered child forces a camera here — the parent of
			// an uncovered node is always the best placement.
			cameras++
			return 1
		}
		if left == 1 || right == 1 {
			return 2
		}
		return 0
	}

	if dfs(root) == 0 {
		cameras++
	}
	return cameras
}
