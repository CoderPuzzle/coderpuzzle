func treeToDoublyList(root *TreeNode) *NodeWithNext {
	var values []int
	var stack []*TreeNode
	node := root
	for len(stack) > 0 || node != nil {
		for node != nil {
			stack = append(stack, node)
			node = node.Left
		}
		node = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		values = append(values, node.Val)
		node = node.Right
	}
	nodes := make([]*NodeWithNext, 0, len(values))
	for _, value := range values {
		nodes = append(nodes, &NodeWithNext{Val: value})
	}
	for index := 0; index+1 < len(nodes); index++ {
		nodes[index].Right = nodes[index+1]
		nodes[index+1].Left = nodes[index]
	}
	if len(nodes) > 0 {
		last := len(nodes) - 1
		nodes[last].Right = nodes[0]
		nodes[0].Left = nodes[last]
		return nodes[0]
	}
	return nil
}
