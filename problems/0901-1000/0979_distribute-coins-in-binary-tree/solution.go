func distributeCoins(root *TreeNode) int {
	moves := 0

	// dfs returns the net coin flow out of this subtree.
	var dfs func(node *TreeNode) int
	dfs = func(node *TreeNode) int {
		if node == nil {
			return 0
		}
		left := dfs(node.Left)
		right := dfs(node.Right)
		// Each |excess| is the flow on that child edge; flows on separate
		// edges never interfere, so summing them is the total moves.
		if left < 0 {
			moves += -left
		} else {
			moves += left
		}
		if right < 0 {
			moves += -right
		} else {
			moves += right
		}
		// Keep one coin for this node; the rest is the parent-bound flow.
		return node.Val + left + right - 1
	}

	dfs(root)
	return moves
}
