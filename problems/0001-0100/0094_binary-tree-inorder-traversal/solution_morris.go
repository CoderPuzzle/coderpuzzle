func inorderTraversal(root *TreeNode) []int {
	result := []int{}
	node := root
	// Loop invariant: the only memory the walk keeps is the cursor and
	// the predecessor it is currently hunting; the path back up to any
	// node still awaiting its visit is threaded into the tree's own
	// right pointers, to be cut again once the node has been read.
	for node != nil {
		if node.Left != nil {
			// Hunt the inorder predecessor first — the rightmost node of
			// the left subtree — stopping early if the right spine
			// already ends in a thread pointing back here.
			pred := node.Left
			for pred.Right != nil && pred.Right != node {
				pred = pred.Right
			}
			if pred.Right == nil {
				// Fresh ground: thread the predecessor back to this node
				// and descend left, planning to return via the thread.
				pred.Right = node
				node = node.Left
			} else {
				// The thread says the left subtree is finished: read the
				// node, cut the thread, and step right.
				result = append(result, node.Val)
				pred.Right = nil
				node = node.Right
			}
		} else {
			result = append(result, node.Val)
			node = node.Right
		}
	}
	return result
}
