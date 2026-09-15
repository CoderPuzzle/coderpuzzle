func zigzagLevelOrder(root *TreeNode) [][]int {
	result := [][]int{}
	if root == nil {
		return result
	}
	queue := []*TreeNode{root}
	// Loop invariant: `queue` holds exactly one level's nodes, left to
	// right; `leftToRight` says which way that level is emitted.
	leftToRight := true
	for len(queue) > 0 {
		level := make([]int, 0, len(queue))
		for _, node := range queue {
			level = append(level, node.Val)
		}
		if !leftToRight {
			// Collected left to right, so reversing yields right to left.
			for i, j := 0, len(level)-1; i < j; i, j = i+1, j-1 {
				level[i], level[j] = level[j], level[i]
			}
		}
		result = append(result, level)
		// Spread the next level: children enter left child first, which
		// keeps the queue ordered left to right for the round to come.
		next := make([]*TreeNode, 0, 2*len(queue))
		for _, node := range queue {
			if node.Left != nil {
				next = append(next, node.Left)
			}
			if node.Right != nil {
				next = append(next, node.Right)
			}
		}
		queue = next
		leftToRight = !leftToRight
	}
	return result
}
