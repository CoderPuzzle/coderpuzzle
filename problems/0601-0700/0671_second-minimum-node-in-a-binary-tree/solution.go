func findSecondMinimumValue(root *TreeNode) int {
	// The min property makes root.Val the minimum of the whole tree: a
	// parent is the smaller of its children, so every value below the
	// root is >= the root's own. The second minimum is therefore the
	// smallest value strictly greater than root.Val. The walk descends
	// only through nodes that still carry the root's value — a node with
	// a larger value is itself the best its whole subtree can offer
	// (everything beneath it is at least as large), so it is taken as a
	// candidate and its subtree is pruned. best starts at -1, which no
	// node value can equal (values are >= 1), so it doubles as the
	// fallback answer.
	rootValue := root.Val
	best := -1
	stack := []*TreeNode{root}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if node.Val == rootValue {
			// 0 or 2 children: one nil check settles both pushes.
			if node.Left != nil {
				stack = append(stack, node.Left, node.Right)
			}
		} else if best == -1 || node.Val < best {
			best = node.Val
		}
	}
	return best
}
