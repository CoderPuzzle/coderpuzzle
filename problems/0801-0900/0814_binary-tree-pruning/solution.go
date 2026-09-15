func pruneTree(root *TreeNode) *TreeNode {
	// A node's subtree is the node plus everything below it, so the keep
	// decision at a node needs its subtrees decided first — the walk is
	// post-order: children before the node.
	if root == nil {
		return nil
	}
	root.Left = pruneTree(root.Left)
	root.Right = pruneTree(root.Right)
	// Keep the node exactly when it is a 1 itself or at least one pruned
	// child survives. A 0 node dropped here takes a subtree with no 1
	// anywhere in it with it; an all-zero tree unwinds to nil. Depth is
	// bounded — at most 200 nodes, so a chain nests at most 201 frames,
	// nothing a goroutine stack cannot grow past.
	if root.Val == 1 || root.Left != nil || root.Right != nil {
		return root
	}
	return nil
}
