func pathSum(root *TreeNode, targetSum int) int {
	// counter maps root-to-node prefix sums seen on the current path to
	// their counts; {0: 1} counts paths starting at a node itself.
	counter := map[int64]int64{0: 1}

	var dfs func(node *TreeNode, running int64) int64
	dfs = func(node *TreeNode, running int64) int64 {
		if node == nil {
			return 0
		}
		running += int64(node.Val)
		// A path ending here with the target starts at an ancestor whose
		// prefix equals running - targetSum (prefix(v) - prefix(u) trick).
		total := counter[running-int64(targetSum)]
		// Register this prefix only after the lookup, then recurse.
		counter[running]++
		total += dfs(node.Left, running)
		total += dfs(node.Right, running)
		// Undo on backtrack: left-subtree prefixes must not pair with
		// right-subtree nodes, so lookups see true ancestors only.
		counter[running]--
		return total
	}

	return int(dfs(root, 0))
}
