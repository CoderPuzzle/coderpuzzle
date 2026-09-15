func buildTree(preorder []int, inorder []int) *TreeNode {
	if len(preorder) == 0 {
		return nil
	}
	root := &TreeNode{Val: preorder[0]}
	// The spine: every node whose left side is (possibly still) growing and
	// whose right child is still pending. Preorder's next value is either
	// the spine top's left child, or the right child of whatever portion of
	// the spine inorder has already finished.
	spine := []*TreeNode{root}
	cursor := 0 // next inorder entry awaiting its turn
	for _, value := range preorder[1:] {
		if spine[len(spine)-1].Val != inorder[cursor] {
			// The top is not due yet, so the value keeps descending left.
			node := &TreeNode{Val: value}
			spine[len(spine)-1].Left = node
			spine = append(spine, node)
		} else {
			// The top is due in inorder: its whole left side is settled, so
			// pop it (and any ancestors also due) -- the new value is the
			// right child of the deepest node popped.
			last := spine[len(spine)-1]
			spine = spine[:len(spine)-1]
			cursor++
			for len(spine) > 0 && spine[len(spine)-1].Val == inorder[cursor] {
				last = spine[len(spine)-1]
				spine = spine[:len(spine)-1]
				cursor++
			}
			node := &TreeNode{Val: value}
			last.Right = node
			spine = append(spine, node)
		}
	}
	return root
}
