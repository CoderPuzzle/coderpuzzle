func increasingBST(root *TreeNode) *TreeNode {
	// The required tree's values, read from its root down its only right
	// links, are ascending — exactly the order an in-order walk of a
	// binary search tree visits. So the answer is that walk, relinked:
	// the leftmost node (visited first) becomes the root, every left link
	// is severed, every right link points at the next visited node. The
	// traversal carries its own stack of deferred nodes rather than
	// recursing, so no runtime call stack is touched at all: the stack
	// holds the current left spine only.
	nodes := []*TreeNode{}
	stack := []*TreeNode{}
	current := root
	for current != nil || len(stack) > 0 {
		// Descend one left spine, deferring every node on it.
		for current != nil {
			stack = append(stack, current)
			current = current.Left
		}
		// The stack top is now the leftmost unvisited node: visit it and
		// continue the walk in its right subtree.
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		nodes = append(nodes, node)
		current = node.Right
	}
	// Relink the visit order into the spine: the last node keeps no right
	// child, and no node keeps a left child.
	for i, node := range nodes {
		node.Left = nil
		if i+1 < len(nodes) {
			node.Right = nodes[i+1]
		} else {
			node.Right = nil
		}
	}
	if len(nodes) == 0 {
		return nil
	}
	return nodes[0]
}
