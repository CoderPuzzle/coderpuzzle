func constructFromPrePost(preorder []int, postorder []int) *TreeNode {
	// Value -> postorder index: makes the left subtree's size an O(1)
	// lookup instead of a scan. Values are unique, so a hit names the one
	// place the left subtree's postorder segment ends.
	index := make(map[int]int, len(postorder))
	for i, value := range postorder {
		index[value] = i
	}
	// build(low, high, postLow) raises the subtree over the preorder range
	// [low, high); its postorder segment starts at postLow. The 30-node
	// ceiling bounds the nesting at 30 calls, so plain recursion is safe
	// in this judge's every runtime.
	var build func(low, high, postLow int) *TreeNode
	build = func(low, high, postLow int) *TreeNode {
		if low >= high {
			// An empty range is a missing subtree.
			return nil
		}
		node := &TreeNode{Val: preorder[low]}
		if high-low == 1 {
			// The subtree is a lone leaf: no child split to find.
			return node
		}
		// The value right behind the root roots the subtree that follows.
		// Postorder ends that subtree with its own root, so
		// [postLow, index[...]] is exactly the left subtree and its size
		// is one past that position.
		leftSize := index[preorder[low+1]] + 1 - postLow
		node.Left = build(low+1, low+1+leftSize, postLow)
		// Whatever remains is the right subtree. When the root really has
		// one child, the left range swallowed the whole remainder and this
		// range comes back empty -- the only child stays on the left, the
		// required answer, with no branch needed.
		node.Right = build(low+1+leftSize, high, postLow+leftSize)
		return node
	}
	return build(0, len(preorder), 0)
}
