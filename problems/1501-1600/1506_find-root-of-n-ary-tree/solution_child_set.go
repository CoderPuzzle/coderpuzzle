func findRoot(tree []*Node) *Node {
	// Indegree zero: every node except the root appears exactly once as
	// someone's child. Collect all the nodes, then discard every node seen
	// as a child — the one survivor is the root.
	survivors := make(map[*Node]bool, len(tree))
	for _, node := range tree {
		survivors[node] = true
	}
	for _, node := range tree {
		for _, child := range node.Children {
			delete(survivors, child)
		}
	}
	for node := range survivors {
		return node
	}
	return nil
}
