func boundaryOfBinaryTree(root *TreeNode) []int {
	isLeaf := func(node *TreeNode) bool {
		return node.Left == nil && node.Right == nil
	}

	// Left boundary: start at the root's left child and keep descending,
	// left child when present and otherwise the right child, stopping
	// before any leaf — the leftmost leaf prints in the leaves alone.
	boundary := []int{root.Val}
	node := root.Left
	for node != nil && !isLeaf(node) {
		boundary = append(boundary, node.Val)
		if node.Left != nil {
			node = node.Left
		} else {
			node = node.Right
		}
	}

	// Leaves left to right: an explicit-stack pre-order seeded with the
	// root's children (the root is never a leaf here, and being skipped
	// at the seed it cannot print twice), right child pushed first so
	// pops run left to right. The stack replaces recursion, so a
	// 10^4-deep chain costs no call stack.
	stack := []*TreeNode{}
	if root.Right != nil {
		stack = append(stack, root.Right)
	}
	if root.Left != nil {
		stack = append(stack, root.Left)
	}
	for len(stack) > 0 {
		node = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if isLeaf(node) {
			boundary = append(boundary, node.Val)
			continue
		}
		if node.Right != nil {
			stack = append(stack, node.Right)
		}
		if node.Left != nil {
			stack = append(stack, node.Left)
		}
	}

	// Right boundary: the mirror walk from the root's right child —
	// right child preferred, stopped before its leaf — collected on the
	// way down and emitted reversed.
	right := []int{}
	node = root.Right
	for node != nil && !isLeaf(node) {
		right = append(right, node.Val)
		if node.Right != nil {
			node = node.Right
		} else {
			node = node.Left
		}
	}
	for i := len(right) - 1; i >= 0; i-- {
		boundary = append(boundary, right[i])
	}
	return boundary
}
