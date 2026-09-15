func rob(root *TreeNode) int {
	// Two independent questions per subtree, each with its own memo table:
	// the best with the root chosen, and the best with the root barred.
	// Asking them separately can re-descend a subtree, but the tables make
	// sure each question is settled once per node.
	takeMap := map[*TreeNode]int{}
	skipMap := map[*TreeNode]int{}

	var take func(node *TreeNode) int
	var skip func(node *TreeNode) int
	take = func(node *TreeNode) int {
		if node == nil {
			return 0
		}
		if best, ok := takeMap[node]; ok {
			return best
		}
		// Taking this node bars both children outright.
		best := node.Val + skip(node.Left) + skip(node.Right)
		takeMap[node] = best
		return best
	}
	skip = func(node *TreeNode) int {
		if node == nil {
			return 0
		}
		if best, ok := skipMap[node]; ok {
			return best
		}
		// Each child keeps its better option.
		best := max(take(node.Left), skip(node.Left)) + max(take(node.Right), skip(node.Right))
		skipMap[node] = best
		return best
	}

	return max(take(root), skip(root))
}
