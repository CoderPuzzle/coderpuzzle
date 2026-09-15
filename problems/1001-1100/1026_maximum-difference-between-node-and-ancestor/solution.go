func maxAncestorDiff(root *TreeNode) int {
	// A frame is a node plus the minimum and maximum values seen among its
	// strict ancestors — the node's own value is not folded in yet.
	type frame struct {
		node             *TreeNode
		pathMin, pathMax int
	}
	stack := []frame{{root, root.Val, root.Val}}
	ans := 0
	for len(stack) > 0 {
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		node, pathMin, pathMax := top.node, top.pathMin, top.pathMax
		// The best pairing for this node always uses one of the two
		// running extremes above it: any other ancestor value lies
		// between pathMin and pathMax, so it can never beat both.
		if diff := abs(node.Val - pathMin); diff > ans {
			ans = diff
		}
		if diff := abs(node.Val - pathMax); diff > ans {
			ans = diff
		}
		newMin, newMax := pathMin, pathMax
		if node.Val < newMin {
			newMin = node.Val
		}
		if node.Val > newMax {
			newMax = node.Val
		}
		if node.Left != nil {
			stack = append(stack, frame{node.Left, newMin, newMax})
		}
		if node.Right != nil {
			stack = append(stack, frame{node.Right, newMin, newMax})
		}
	}
	return ans
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
