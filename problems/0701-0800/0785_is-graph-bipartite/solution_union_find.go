func isBipartite(graph [][]int) bool {
	n := len(graph)
	parent := make([]int, n)
	for i := range parent {
		parent[i] = i
	}

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

	union := func(a, b int) {
		parent[find(a)] = find(b)
	}

	// Bipartite means the nodes split into two groups with every edge
	// crossing between them, so all of a node's neighbors must be able
	// to share the one opposite group.
	for u := 0; u < n; u++ {
		if len(graph[u]) == 0 {
			continue
		}
		// Union u's enemies together: they all belong to one set.
		for _, v := range graph[u][1:] {
			union(graph[u][0], v)
		}
	}
	// A node sharing a set with one of its own enemies sits inside an
	// odd cycle: not bipartite.
	for u := 0; u < n; u++ {
		for _, v := range graph[u] {
			if find(u) == find(v) {
				return false
			}
		}
	}
	return true
}
