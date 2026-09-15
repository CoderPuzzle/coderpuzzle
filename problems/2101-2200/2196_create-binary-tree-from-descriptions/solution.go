func createBinaryTree(descriptions [][]int) *TreeNode {
	nodes := map[int]*TreeNode{}
	children := map[int]bool{}
	get := func(value int) *TreeNode {
		if node, ok := nodes[value]; ok {
			return node
		}
		node := &TreeNode{Val: value}
		nodes[value] = node
		return node
	}
	for _, d := range descriptions {
		children[d[1]] = true
		parent, child := get(d[0]), get(d[1])
		if d[2] == 1 {
			parent.Left = child
		} else {
			parent.Right = child
		}
	}
	for value, node := range nodes {
		if !children[value] {
			return node
		}
	}
	return nil
}
