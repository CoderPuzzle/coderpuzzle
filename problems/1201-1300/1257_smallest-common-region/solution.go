func findSmallestRegion(regions [][]string, region1 string, region2 string) string {
	parent := make(map[string]string)
	for _, group := range regions {
		for _, child := range group[1:] {
			parent[child] = group[0]
		}
	}
	// Ancestor chain of region1, itself included.
	chain := make(map[string]bool)
	node := region1
	for {
		chain[node] = true
		up, ok := parent[node]
		if !ok {
			break
		}
		node = up
	}
	// First ancestor of region2 inside that chain is the LCA.
	node = region2
	for !chain[node] {
		node = parent[node]
	}
	return node
}
