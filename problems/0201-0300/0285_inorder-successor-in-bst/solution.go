func inorderSuccessor(root *TreeNode, p int) *TreeNode {
	// One descent from the root, remembering the last node the walk stepped
	// left from: it is the best successor candidate so far — smaller than
	// every earlier candidate, still greater than p.
	var successor *TreeNode
	node := root
	for node != nil {
		if p < node.Val {
			successor = node
			node = node.Left
		} else if p > node.Val {
			node = node.Right
		} else {
			// Found p: with a right child the successor is the leftmost
			// node of that subtree; without one it is the candidate the walk
			// already remembers. Neither exists -> nil, p is the largest
			// value in the tree.
			node = node.Right
			for node != nil {
				successor = node
				node = node.Left
			}
			break
		}
	}
	return successor
}
