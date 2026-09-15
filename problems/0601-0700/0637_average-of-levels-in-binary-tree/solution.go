func averageOfLevels(root *TreeNode) []float64 {
	averages := []float64{}
	queue := []*TreeNode{}
	if root != nil {
		queue = append(queue, root)
	}
	for len(queue) > 0 {
		// One round drains exactly one level: the nodes sitting in the
		// queue when the round starts. Children appended during the round
		// belong to the next level, and the count is fixed up front. The
		// sum runs in int64 — 10^4 values of magnitude 2^31 stay far
		// inside it — so the only rounding anywhere is the single division
		// that closes the round.
		var total int64
		remaining := len(queue)
		for i := 0; i < remaining; i++ {
			node := queue[i]
			total += int64(node.Val)
			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
		queue = queue[remaining:]
		averages = append(averages, float64(total)/float64(remaining))
	}
	return averages
}
