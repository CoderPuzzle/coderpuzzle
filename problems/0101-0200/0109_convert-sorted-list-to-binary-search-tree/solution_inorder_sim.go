func sortedListToBST(head *ListNode) *TreeNode {
	// One sizing pass first: the recursion needs each subtree's node
	// count to pick the same middles the midpoint walk would.
	count := 0
	for node := head; node != nil; node = node.Next {
		count++
	}
	// The cursor walks the list in original order; the recursion claims
	// nodes exactly where an inorder insertion would place them.
	current := head
	var build func(lo, hi int) *TreeNode
	build = func(lo, hi int) *TreeNode {
		if lo >= hi {
			return nil
		}
		// The left subtree is the first half of [lo, hi) — the same
		// tie-break as the midpoint walk, so both variants build the
		// identical tree.
		mid := (lo + hi) / 2
		left := build(lo, mid)
		// Inorder position: after the left subtree, the next node in
		// original order is the root; the cursor hands it over and steps
		// forward, then the right subtree takes what remains.
		root := &TreeNode{Val: current.Val}
		current = current.Next
		root.Left = left
		root.Right = build(mid+1, hi)
		return root
	}
	return build(0, count)
}
