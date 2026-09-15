func encode(root *Node) *TreeNode {
	if root == nil {
		return nil
	}
	broot := &TreeNode{Val: root.Val}
	nodes := []*Node{root}
	binaries := []*TreeNode{broot}
	for len(nodes) > 0 {
		node := nodes[0]
		bnode := binaries[0]
		nodes = nodes[1:]
		binaries = binaries[1:]
		var prev *TreeNode
		for _, child := range node.Children {
			bchild := &TreeNode{Val: child.Val}
			if prev == nil {
				bnode.Left = bchild
			} else {
				prev.Right = bchild
			}
			prev = bchild
			nodes = append(nodes, child)
			binaries = append(binaries, bchild)
		}
	}
	return broot
}
