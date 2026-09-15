func postorder(root *Node) []int {
	if root == nil {
		return []int{}
	}
	out := []int{}
	type frame struct {
		node  *Node
		index int
	}
	stack := []frame{{root, 0}}
	for len(stack) > 0 {
		top := &stack[len(stack)-1]
		if top.index < len(top.node.Children) {
			child := top.node.Children[top.index]
			top.index++
			stack = append(stack, frame{child, 0})
			continue
		}
		out = append(out, top.node.Val)
		stack = stack[:len(stack)-1]
	}
	return out
}
