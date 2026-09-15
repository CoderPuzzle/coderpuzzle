func findBottomLeftValue(root *TreeNode) int {
	// Children enter right-first, so every row drains right-to-left and the
	// last node dequeued overall is the leftmost node of the deepest row:
	// each dequeue overwrites the answer and the final row wins.
	queue := []*TreeNode{root}
	answer := root.Val
	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		answer = node.Val
		if node.Right != nil {
			queue = append(queue, node.Right)
		}
		if node.Left != nil {
			queue = append(queue, node.Left)
		}
	}
	return answer
}
