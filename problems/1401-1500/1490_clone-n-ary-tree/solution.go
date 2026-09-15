func cloneTree(root *Node) *Node {
	if root == nil {
		return nil
	}
	// Level-order copy: every original node gets exactly one fresh clone,
	// and the registry records which clone belongs to it, so each original
	// child link is replayed through the registry.
	clones := map[*Node]*Node{root: {Val: root.Val}}
	queue := []*Node{root}
	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		for _, child := range node.Children {
			clones[child] = &Node{Val: child.Val}
			clones[node].Children = append(clones[node].Children, clones[child])
			queue = append(queue, child)
		}
	}
	return clones[root]
}
