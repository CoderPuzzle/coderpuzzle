func trimBST(root *TreeNode, low int, high int) *TreeNode {
	// A node below low drags its whole left subtree below low with it —
	// discard the node and continue in its right subtree; a node above
	// high is the mirror image. Walking that rule down from the root
	// lands on the first in-range node, the trimmed tree's new root — or
	// falls off the tree when nothing survives.
	for root != nil && (root.Val < low || root.Val > high) {
		if root.Val > high {
			root = root.Left
		} else {
			root = root.Right
		}
	}
	if root == nil {
		return nil
	}
	// Every node on the stack is in range, so only its children can be
	// out. Each repair replaces an out-of-range child link with a
	// same-side descendant — exactly the reattachment the recursive trim
	// would make — so surviving nodes keep their original descendants.
	// The traversal carries its own stack of nodes so a single 10^4-node
	// chain never strains the goroutine call stack.
	stack := []*TreeNode{root}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		// A left child below low carries its own left subtree below low
		// too; hoist the child's right child until the link holds a node
		// in range (only the low side can break here: every left value is
		// below the in-range parent, hence at most high).
		for node.Left != nil && node.Left.Val < low {
			node.Left = node.Left.Right
		}
		// A right child above high hoists its left child, symmetrically.
		for node.Right != nil && node.Right.Val > high {
			node.Right = node.Right.Left
		}
		if node.Left != nil {
			stack = append(stack, node.Left)
		}
		if node.Right != nil {
			stack = append(stack, node.Right)
		}
	}
	return root
}
