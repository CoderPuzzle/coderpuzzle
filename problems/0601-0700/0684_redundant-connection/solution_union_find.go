func findRedundantConnection(edges [][]int) []int {
	parent := make(map[int]int)

	var find func(node int) int
	find = func(node int) int {
		root := node
		for parent[root] != root {
			root = parent[root]
		}
		// Second walk repoints every visited node at the root (path
		// compression), flattening the structure for later finds.
		for parent[node] != root {
			next := parent[node]
			parent[node] = root
			node = next
		}
		return root
	}

	union := func(a, b int) bool {
		// Unseen nodes register lazily on first touch.
		if _, ok := parent[a]; !ok {
			parent[a] = a
		}
		if _, ok := parent[b]; !ok {
			parent[b] = b
		}
		ra, rb := find(a), find(b)
		// Equal roots mean this edge would reconnect one component: the cycle.
		if ra == rb {
			return false
		}
		parent[ra] = rb
		return true
	}

	// A tree plus one extra edge has exactly one cycle; the first edge
	// failing the union test is the one that closes it.
	for _, edge := range edges {
		if !union(edge[0], edge[1]) {
			return edge
		}
	}
	return nil
}
