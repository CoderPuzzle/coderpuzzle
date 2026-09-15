func cloneGraph(node *GraphNode) *GraphNode {
	clones := make(map[int]*GraphNode)
	var build func(node *GraphNode) *GraphNode
	build = func(node *GraphNode) *GraphNode {
		if node == nil {
			return nil
		}
		if existing, ok := clones[node.Val]; ok {
			return existing
		}
		clone := &GraphNode{Val: node.Val}
		clones[node.Val] = clone
		for _, neighbor := range node.Neighbors {
			clone.Neighbors = append(clone.Neighbors, build(neighbor))
		}
		return clone
	}
	return build(node)
}
