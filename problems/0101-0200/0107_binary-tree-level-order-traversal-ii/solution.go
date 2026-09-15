func levelOrderBottom(root *TreeNode) [][]int {
	levels := [][]int{}
	queue := []*TreeNode{}
	if root != nil {
		queue = append(queue, root)
	}
	for len(queue) > 0 {
		// One round of the outer loop consumes exactly one level: the
		// nodes sitting in the queue when the round starts. Children
		// appended during the round belong to the next level.
		remaining := len(queue)
		level := []int{}
		for i := 0; i < remaining; i++ {
			node := queue[i]
			level = append(level, node.Val)
			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
		queue = queue[remaining:]
		levels = append(levels, level)
	}
	// Levels were collected root-first; the statement wants leaf-first.
	for i, j := 0, len(levels)-1; i < j; i, j = i+1, j-1 {
		levels[i], levels[j] = levels[j], levels[i]
	}
	return levels
}
