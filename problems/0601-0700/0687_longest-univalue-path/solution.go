// A same-value path reaches some highest node and falls into at most two
// arms, so every node can summarize its subtree in one number: the length,
// in edges, of the longest downward path of its own value leaving it. Arms
// are settled children-first and a running maximum over all bend points —
// the sum of a node's two arms — is the answer. The walk carries its own
// stack: the constraints allow a 1000-deep same-value chain, and recursion
// would nest a thousand frames — past CPython's default limit and over the
// 512k stacks the judge hands Java and Node.
func longestUnivaluePath(root *TreeNode) int {
	order := []*TreeNode{}
	stack := []*TreeNode{}
	if root != nil {
		stack = append(stack, root)
	}
	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		order = append(order, node)
		if node.Left != nil {
			stack = append(stack, node.Left)
		}
		if node.Right != nil {
			stack = append(stack, node.Right)
		}
	}

	// Pre-order collection puts every parent before its descendants, so the
	// reversed walk is post-order: a node's children's arms are always
	// already in the map when it looks them up.
	arms := make(map[*TreeNode]int)
	best := 0
	for index := len(order) - 1; index >= 0; index-- {
		node := order[index]
		left, right := 0, 0
		if node.Left != nil && node.Left.Val == node.Val {
			left = arms[node.Left] + 1
		}
		if node.Right != nil && node.Right.Val == node.Val {
			right = arms[node.Right] + 1
		}
		if left > right {
			arms[node] = left
		} else {
			arms[node] = right
		}
		if left+right > best {
			best = left + right
		}
	}
	return best
}
