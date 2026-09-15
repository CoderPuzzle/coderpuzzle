func cloneTree(root *Node) *Node {
	if root == nil {
		return nil
	}
	clone := &Node{Val: root.Val}
	for _, child := range root.Children {
		clone.Children = append(clone.Children, cloneTree(child))
	}
	return clone
}
