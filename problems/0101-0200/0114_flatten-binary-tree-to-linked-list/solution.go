func flatten(root *TreeNode) *TreeNode {
	node := root
	// Loop invariant: every node already passed hangs on a single right
	// spine — the flattened pre-order prefix, all left pointers nil — so
	// `node` is always the next pre-order node awaiting its splice.
	for node != nil {
		if node.Left != nil {
			// The rightmost node of the left subtree ends that subtree's
			// pre-order, so it is the last node visited before the old right
			// subtree: let it adopt that subtree, then swing the whole left
			// subtree across to the right.
			tail := node.Left
			for tail.Right != nil {
				tail = tail.Right
			}
			tail.Right = node.Right
			node.Right = node.Left
			node.Left = nil
		}
		node = node.Right
	}
	return root
}
