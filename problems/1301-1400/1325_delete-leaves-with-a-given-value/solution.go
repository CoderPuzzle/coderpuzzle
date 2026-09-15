func removeLeafNodes(root *TreeNode, target int) *TreeNode {
	// Post-order prune with an explicit stack (a 3000-node chain would
	// overflow any recursion budget): children are judged before the node
	// itself, so the whole cascade collapses in one pass.
	if root == nil {
		return nil
	}
	type entry struct {
		node     *TreeNode
		parent   *TreeNode
		side     int
		expanded bool
	}
	stack := []entry{{root, nil, 0, false}}
	for len(stack) > 0 {
		e := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if !e.expanded {
			stack = append(stack, entry{e.node, e.parent, e.side, true})
			if e.node.Left != nil {
				stack = append(stack, entry{e.node.Left, e.node, 0, false})
			}
			if e.node.Right != nil {
				stack = append(stack, entry{e.node.Right, e.node, 1, false})
			}
			continue
		}
		if e.node.Left == nil && e.node.Right == nil && e.node.Val == target {
			if e.parent == nil {
				return nil
			}
			if e.side == 0 {
				e.parent.Left = nil
			} else {
				e.parent.Right = nil
			}
		}
	}
	return root
}
