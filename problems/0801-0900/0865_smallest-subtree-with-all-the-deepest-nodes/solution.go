// frame pairs a subtree root with whether its height is measured yet.
type frame struct {
	node     *TreeNode
	measured bool
}

func subtreeWithAllDeepest(root *TreeNode) *TreeNode {
	if root == nil {
		return nil
	}
	// A node can only be judged once both of its children's heights are
	// known, so the walk is post-order — children before the node — over
	// an explicit stack: the first pop of a frame schedules the node's own
	// merge beneath its two children, and the second — the measured frame
	// — can only fire once both subtrees are measured. Iterating keeps a
	// 500-node chain's ~500 merges off the goroutine stack.
	heights := map[*TreeNode]int{}
	smallest := map[*TreeNode]*TreeNode{}
	stack := []frame{{root, false}}
	for len(stack) > 0 {
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if !top.measured {
			stack = append(stack, frame{top.node, true})
			if top.node.Right != nil {
				stack = append(stack, frame{top.node.Right, false})
			}
			if top.node.Left != nil {
				stack = append(stack, frame{top.node.Left, false})
			}
			continue
		}
		node := top.node
		lh, rh := 0, 0
		if node.Left != nil {
			lh = heights[node.Left]
		}
		if node.Right != nil {
			rh = heights[node.Right]
		}
		heights[node] = 1 + max(lh, rh)
		// Equal heights: each side reaches this subtree's deepest level,
		// so its deepest nodes sit on both sides and only this node
		// covers them all — it is the subtree's answer. Unequal: no
		// deepest node can live in the shallower side, so the deeper
		// side's answer passes through unchanged.
		if lh == rh {
			smallest[node] = node
		} else if lh > rh {
			smallest[node] = smallest[node.Left]
		} else {
			smallest[node] = smallest[node.Right]
		}
	}
	return smallest[root]
}
