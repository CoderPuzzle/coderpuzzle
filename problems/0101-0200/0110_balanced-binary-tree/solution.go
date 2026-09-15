func isBalanced(root *TreeNode) bool {
	if root == nil {
		return true
	}
	// Bottom-up height check: `heights` maps each node to its subtree
	// height, or to -1 once an imbalance is found anywhere inside it.
	heights := make(map[*TreeNode]int)
	// Explicit post-order stack: a node is settled only after both of its
	// children's heights are known — no recursion, so a 5000-node skewed
	// chain cannot overflow any call stack.
	stack := []*TreeNode{root}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		left, right := node.Left, node.Right
		_, leftReady := heights[left]
		_, rightReady := heights[right]
		if (left == nil || leftReady) && (right == nil || rightReady) {
			stack = stack[:len(stack)-1]
			leftHeight, rightHeight := 0, 0
			if left != nil {
				leftHeight = heights[left]
			}
			if right != nil {
				rightHeight = heights[right]
			}
			diff := leftHeight - rightHeight
			if diff < 0 {
				diff = -diff
			}
			// -1 propagates: a subtree that contains an imbalance can
			// never regain balance higher up, so it fails every ancestor.
			if leftHeight == -1 || rightHeight == -1 || diff > 1 {
				heights[node] = -1
			} else {
				heights[node] = 1 + max(leftHeight, rightHeight)
			}
		} else {
			if left != nil && !leftReady {
				stack = append(stack, left)
			}
			if right != nil && !rightReady {
				stack = append(stack, right)
			}
		}
	}
	return heights[root] != -1
}
