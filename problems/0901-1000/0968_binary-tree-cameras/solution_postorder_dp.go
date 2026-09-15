func minCameraCover(root *TreeNode) int {
	const inf = 1_000_000

	// Triple of minimum monitor counts for the subtree rooted at `node`:
	// [0] the root holds a monitor, [1] the root is covered without one,
	// [2] the root waits uncovered for its parent.
	var dfs func(node *TreeNode) [3]int
	dfs = func(node *TreeNode) [3]int {
		if node == nil {
			// A missing child is free whenever any state is allowed and can
			// never be the monitor holder, so it folds in as {inf, 0, inf}.
			return [3]int{inf, 0, inf}
		}
		left := dfs(node.Left)
		right := dfs(node.Right)
		// A monitor placed here observes both children, so each child may
		// sit in any of its three states.
		withMonitor := 1 + tripleMin(left) + tripleMin(right)
		// Coverage without own monitor must arrive from a child, and the
		// other child is then on its own — no monitor here can help it.
		covered := min(left[0]+min(right[0], right[1]), right[0]+min(left[0], left[1]))
		// Staying uncovered forbids monitors here and at both children, so
		// each child must already be covered from below.
		uncovered := min(left[0], left[1]) + min(right[0], right[1])
		return [3]int{withMonitor, covered, uncovered}
	}

	// The root has no parent to wait for, so it must already be covered.
	best := dfs(root)
	return min(best[0], best[1])
}

func tripleMin(t [3]int) int {
	return min(t[0], min(t[1], t[2]))
}
