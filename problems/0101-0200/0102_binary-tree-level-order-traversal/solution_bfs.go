func levelOrder(root *TreeNode) [][]int {
	// Handle the empty tree up front, before the queue exists.
	if root == nil {
		return [][]int{}
	}
	result := [][]int{}
	queue := []*TreeNode{root}
	// Loop invariant: at the top of each round the queue holds exactly
	// one level's nodes and nothing else.
	for len(queue) > 0 {
		// Snapshot the size now: children enqueued below belong to the
		// NEXT level, so draining exactly `size` nodes keeps levels
		// separated without any sentinel markers.
		size := len(queue)
		level := make([]int, 0, size)
		for i := 0; i < size; i++ {
			node := queue[0]
			queue = queue[1:]
			level = append(level, node.Val)
			// Skipping nil children on enqueue keeps the invariant;
			// left-then-right order preserves reading order.
			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
		result = append(result, level)
	}
	return result
}
