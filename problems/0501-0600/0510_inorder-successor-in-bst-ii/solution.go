func inorderSuccessor(tree *NodeWithNext, node int) *NodeWithNext {
	var target *NodeWithNext
	stack := make([]*NodeWithNext, 0, 1)
	if tree != nil {
		stack = append(stack, tree)
	}
	for len(stack) > 0 && target == nil {
		current := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		if current.Val == node {
			target = current
		}
		if current.Left != nil {
			stack = append(stack, current.Left)
		}
		if current.Right != nil {
			stack = append(stack, current.Right)
		}
	}
	if target == nil {
		return nil
	}
	if target.Right != nil {
		successor := target.Right
		for successor.Left != nil {
			successor = successor.Left
		}
		return successor
	}
	for target.Parent != nil && target.Parent.Left != target {
		target = target.Parent
	}
	return target.Parent
}
