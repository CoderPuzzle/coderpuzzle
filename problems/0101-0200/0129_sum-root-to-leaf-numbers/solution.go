func sumNumbers(root *TreeNode) int {
	// The node range [1, 1000] guarantees a root, so the walk starts at the
	// first digit with no empty-tree case.
	total := 0
	// A frame is a node plus the number formed by the digits from the root
	// down to (but excluding) it; appending the node's value extends that
	// number by one digit.
	type frame struct {
		node   *TreeNode
		prefix int
	}
	stack := []frame{{root, 0}}
	for len(stack) > 0 {
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		node, number := top.node, top.prefix*10+top.node.Val
		if node.Left == nil && node.Right == nil {
			// The path ends here, so its number is complete and joins the
			// total — the only place a value is ever summed.
			total += number
		} else {
			// An internal node never sums on its own: its digit only matters
			// inside the numbers of the leaves below it.
			if node.Left != nil {
				stack = append(stack, frame{node.Left, number})
			}
			if node.Right != nil {
				stack = append(stack, frame{node.Right, number})
			}
		}
	}
	return total
}
