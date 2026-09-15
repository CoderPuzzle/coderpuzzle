func copyRandomBinaryTree(root *RandomTreeNode) *RandomTreeNode {
	clones := make(map[*RandomTreeNode]*RandomTreeNode)
	var clone func(node *RandomTreeNode) *RandomTreeNode
	clone = func(node *RandomTreeNode) *RandomTreeNode {
		if node == nil {
			return nil
		}
		if existing, ok := clones[node]; ok {
			return existing
		}
		copy := &RandomTreeNode{Val: node.Val}
		clones[node] = copy
		copy.Left = clone(node.Left)
		copy.Right = clone(node.Right)
		copy.Random = clone(node.Random)
		return copy
	}
	return clone(root)
}
