type frame struct {
	node  *TreeNode
	phase int
}

func maxPathSum(root *TreeNode) int {
	// Explicit post-order: frames of (node, phase) replace the call stack.
	// Phase 0 = first visit (descend left), 1 = left done (descend right),
	// 2 = both done (combine). Finished single-side gains pile on their own
	// stack, the children's results waiting for the parent.
	stack := []frame{}
	gains := []int64{}
	// A path must contain at least one node, so start effectively at -inf.
	best := int64(1) << 62
	best = -best
	if root != nil {
		stack = append(stack, frame{root, 0})
	}
	for len(stack) > 0 {
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		node, phase := top.node, top.phase
		if phase == 0 {
			// Reschedule as phase 1, then let the left subtree run first by
			// sitting on top of the stack.
			stack = append(stack, frame{node, 1})
			if node.Left != nil {
				stack = append(stack, frame{node.Left, 0})
			}
		} else if phase == 1 {
			stack = append(stack, frame{node, 2})
			if node.Right != nil {
				stack = append(stack, frame{node.Right, 0})
			}
		} else {
			// Both subtrees finished: right's gain sits above left's on the
			// gain stack (left ran first). Missing children left nothing to
			// pop, hence the ok checks.
			var rightGain, leftGain *int64
			if node.Right != nil {
				value := gains[len(gains)-1]
				gains = gains[:len(gains)-1]
				rightGain = &value
			}
			if node.Left != nil {
				value := gains[len(gains)-1]
				gains = gains[:len(gains)-1]
				leftGain = &value
			}
			clamp := func(value *int64) int64 {
				// Clamp each side at 0: a negative branch is better left
				// unvisited.
				if value == nil || *value < 0 {
					return 0
				}
				return *value
			}
			downLeft := clamp(leftGain)
			downRight := clamp(rightGain)
			value := int64(node.Val)
			// The path bending through this node is a candidate for the
			// global answer.
			if total := value + downLeft + downRight; total > best {
				best = total
			}
			// The parent may only extend the path through one side.
			single := value + downLeft
			if downRight > downLeft {
				single = value + downRight
			}
			gains = append(gains, single)
		}
	}
	return int(best)
}
