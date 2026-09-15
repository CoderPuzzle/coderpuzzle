func connect(root *NodeWithNext) *NodeWithNext {
	if root == nil {
		return nil
	}
	queue := []*NodeWithNext{root}
	for len(queue) > 0 {
		// len(queue) is this level's width; children appended inside the
		// loop belong to the next level and never enter this round.
		size := len(queue)
		var previous *NodeWithNext
		for i := 0; i < size; i++ {
			node := queue[0]
			queue = queue[1:]
			// Link to whoever leaves the queue next within the same level;
			// the level's last node keeps the empty next it started with.
			if previous != nil {
				previous.Next = node
			}
			previous = node
			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
	}
	return root
}
