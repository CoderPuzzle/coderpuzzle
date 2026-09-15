func isPreorder(nodes [][]int) bool {
	// Stack of ancestors whose subtrees are still open. Popping until the
	// parent surfaces closes every subtree finished since the last visit;
	// an empty stack before that means the parent is gone for good.
	stack := make([]int, 0, len(nodes))
	for i, node := range nodes {
		nodeID, parentID := node[0], node[1]
		if i == 0 {
			if parentID != -1 {
				return false
			}
		} else {
			for len(stack) > 0 && stack[len(stack)-1] != parentID {
				stack = stack[:len(stack)-1]
			}
			if len(stack) == 0 {
				return false
			}
		}
		stack = append(stack, nodeID)
	}
	return true
}
