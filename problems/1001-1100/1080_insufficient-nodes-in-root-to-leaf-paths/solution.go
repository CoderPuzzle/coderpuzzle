func sufficientSubset(root *TreeNode, limit int) *TreeNode {
	// Post-order with an explicit stack. Each frame is (node, remaining,
	// parent, isLeft, revisited): the first visit pushes the children with
	// the budget reduced by the node's value, and the second visit decides
	// keep-or-prune once the children are pruned in place. A leaf survives
	// iff its value clears the remaining budget; an internal node survives
	// iff at least one child survived.
	type frame struct {
		node      *TreeNode
		remaining int
		parent    *TreeNode
		isLeft    bool
		revisited bool
	}
	stack := []frame{{root, limit, nil, false, false}}
	var result *TreeNode
	for len(stack) > 0 {
		top := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		node := top.node
		if node == nil {
			continue
		}
		if !top.revisited {
			if node.Left == nil && node.Right == nil {
				if node.Val < top.remaining {
					if top.parent == nil {
						result = nil
					} else if top.isLeft {
						top.parent.Left = nil
					} else {
						top.parent.Right = nil
					}
				} else if top.parent == nil {
					result = node
				}
				continue
			}
			stack = append(stack, frame{node, top.remaining, top.parent, top.isLeft, true})
			stack = append(stack, frame{node.Right, top.remaining - node.Val, node, false, false})
			stack = append(stack, frame{node.Left, top.remaining - node.Val, node, true, false})
		} else if node.Left == nil && node.Right == nil {
			// Both children were pruned, so no leaf below reaches limit.
			if top.parent == nil {
				result = nil
			} else if top.isLeft {
				top.parent.Left = nil
			} else {
				top.parent.Right = nil
			}
		} else if top.parent == nil {
			result = node
		}
	}
	return result
}
