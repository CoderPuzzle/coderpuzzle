func invertTree(root *TreeNode) *TreeNode {
	// A mirror is self-similar: to invert a tree, invert both subtrees
	// and cross them at the root. The recursion bottoms out at nil,
	// the empty tree, which is its own mirror.
	if root == nil {
		return nil
	}
	// Each call returns a subtree already mirrored end-to-end, so the
	// two finished results only need to trade places at this node.
	left := invertTree(root.Left)
	right := invertTree(root.Right)
	root.Left = right
	root.Right = left
	return root
}
