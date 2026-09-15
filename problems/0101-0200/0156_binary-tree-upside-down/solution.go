func upsideDownBinaryTree(root *TreeNode) *TreeNode {
	node := root
	var parent, sibling *TreeNode
	// Loop invariant: `node` walks the original left spine, `parent` is its
	// original parent and `sibling` its original right sibling; every spine
	// node already passed is fully relinked into its flipped orientation, so
	// the loop only ever reads original edges ahead of it.
	for node != nil {
		// Save both links before overwriting: `next` continues the spine walk,
		// `rightSave` is the sibling of the next spine node.
		next := node.Left
		rightSave := node.Right
		// The original right sibling becomes the new left child.
		node.Left = sibling
		// The original parent becomes the new right child.
		node.Right = parent
		parent = node
		sibling = rightSave
		node = next
	}
	// The walk ends past the leftmost node; `parent` is that node — the new
	// root.
	return parent
}
