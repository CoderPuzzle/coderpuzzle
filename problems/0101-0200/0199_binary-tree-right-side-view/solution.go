func rightSideView(root *TreeNode) []int {
	view := []int{}
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
		// A level was collected left to right, so its last value is the
		// one the right side sees.
		view = append(view, level[len(level)-1])
	}
	return view
}
