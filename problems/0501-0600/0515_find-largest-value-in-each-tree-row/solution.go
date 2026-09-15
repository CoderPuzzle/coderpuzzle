func largestValues(root *TreeNode) []int {
	largest := []int{}
	queue := []*TreeNode{}
	if root != nil {
		queue = append(queue, root)
	}
	for len(queue) > 0 {
		// One round drains exactly one level: the nodes sitting in the
		// queue when the round starts. Children appended during the round
		// belong to the next level. A level always holds at least one
		// node, so its first value seeds the running maximum — no
		// sentinel, which matters when a whole row sits at -1<<31.
		best := queue[0].Val
		remaining := len(queue)
		for i := 0; i < remaining; i++ {
			node := queue[i]
			if node.Val > best {
				best = node.Val
			}
			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
		queue = queue[remaining:]
		largest = append(largest, best)
	}
	return largest
}
