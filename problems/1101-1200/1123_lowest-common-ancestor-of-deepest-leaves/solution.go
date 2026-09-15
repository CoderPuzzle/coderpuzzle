func lcaDeepestLeaves(root *TreeNode) *TreeNode {
	if root == nil {
		return nil
	}
	// A pre-order stack walk lists parents before children, so the reversed
	// list settles every child's height before its parent reads it.
	order := []*TreeNode{}
	stack := []*TreeNode{root}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		order = append(order, node)
		if node.Right != nil {
			stack = append(stack, node.Right)
		}
		if node.Left != nil {
			stack = append(stack, node.Left)
		}
	}
	height := make(map[*TreeNode]int, len(order))
	for i := len(order) - 1; i >= 0; i-- {
		node := order[i]
		best := -1
		if node.Left != nil {
			if h := height[node.Left]; h > best {
				best = h
			}
		}
		if node.Right != nil {
			if h := height[node.Right]; h > best {
				best = h
			}
		}
		height[node] = best + 1
	}
	// Descend toward the taller child; a tie means both sides reach the
	// deepest leaves, so this node is their lowest common ancestor.
	node := root
	for {
		leftH, rightH := -1, -1
		if node.Left != nil {
			leftH = height[node.Left]
		}
		if node.Right != nil {
			rightH = height[node.Right]
		}
		switch {
		case leftH > rightH:
			node = node.Left
		case rightH > leftH:
			node = node.Right
		default:
			return node
		}
	}
}
