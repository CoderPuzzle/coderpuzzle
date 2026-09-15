func findRoot(tree []*Node) *Node {
	// Value cancellation: every non-root appears exactly once as someone's
	// child, so summing every node's value and subtracting every child's
	// value cancels everything except the root's value. A second scan
	// turns that surviving value back into its node — no extra collection
	// is kept at any point.
	total := 0
	for _, node := range tree {
		total += node.Val
		for _, child := range node.Children {
			total -= child.Val
		}
	}
	for _, node := range tree {
		if node.Val == total {
			return node
		}
	}
	return nil
}
