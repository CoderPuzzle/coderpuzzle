func maximumAverageSubtree(root *TreeNode) float64 {
	// Pre-order listing: each descendant appears after its ancestor, so the
	// reversed list settles both subtrees before the node above them.
	order := []*TreeNode{}
	stack := []*TreeNode{}
	if root != nil {
		stack = append(stack, root)
	}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		order = append(order, node)
		// Push right first so left is visited first in the listing.
		if node.Right != nil {
			stack = append(stack, node.Right)
		}
		if node.Left != nil {
			stack = append(stack, node.Left)
		}
	}
	aggregate := make(map[*TreeNode][2]int64) // node -> {sum, size}
	best := 0.0
	for i := len(order) - 1; i >= 0; i-- {
		node := order[i]
		var total, size int64
		total = int64(node.Val)
		size = 1
		if node.Left != nil {
			pair := aggregate[node.Left]
			total += pair[0]
			size += pair[1]
		}
		if node.Right != nil {
			pair := aggregate[node.Right]
			total += pair[0]
			size += pair[1]
		}
		aggregate[node] = [2]int64{total, size}
		if avg := float64(total) / float64(size); avg > best {
			best = avg
		}
	}
	return best
}
