func connect(root *NodeWithNext) *NodeWithNext {
	if root == nil {
		return nil
	}
	queue := []*NodeWithNext{root}
	for len(queue) > 0 {
		// Snapshot the width now: children appended below belong to the
		// next level, so draining exactly this many nodes walks one
		// level per round.
		width := len(queue)
		var previous *NodeWithNext
		for i := 0; i < width; i++ {
			node := queue[0]
			queue = queue[1:]
			// The node dequeued just before this one is exactly its
			// right-hand neighbor; the level's last node finds no
			// successor and keeps its empty `next`.
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
