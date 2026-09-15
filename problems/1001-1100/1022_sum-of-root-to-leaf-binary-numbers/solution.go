func sumRootToLeaf(root *TreeNode) int {
	// The node range [1, 1000] guarantees a root, so the walk starts at
	// the first bit with no empty-tree case. The running value and the
	// total are carried in int64 rather than int32: nothing in the
	// statement caps how deep a path runs before it must fit the promised
	// 32-bit answer, so a wide accumulator removes any risk of
	// intermediate overflow while a long prefix is still being walked.
	var total int64
	// A frame is a node plus the value formed by the bits from the root
	// down to (but excluding) it; appending the node's value extends that
	// value by one bit.
	type frame struct {
		node    *TreeNode
		running int64
	}
	stack := []frame{{root, 0}}
	for len(stack) > 0 {
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		node, value := top.node, top.running*2+int64(top.node.Val)
		if node.Left == nil && node.Right == nil {
			// The path ends here, so its value is complete and joins the
			// total — the only place a value is ever summed.
			total += value
		} else {
			// An internal node never sums on its own: its bit only
			// matters inside the values of the leaves below it.
			if node.Left != nil {
				stack = append(stack, frame{node.Left, value})
			}
			if node.Right != nil {
				stack = append(stack, frame{node.Right, value})
			}
		}
	}
	// The statement guarantees the answer fits a 32-bit integer.
	return int(total)
}
