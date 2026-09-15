func allPathsSourceTarget(graph [][]int) [][]int {
	n := len(graph)
	target := n - 1
	paths := [][]int{}
	path := []int{0}

	var dfs func(node int)
	// The graph is acyclic, so every walk from 0 is a simple
	// path and DFS can never loop; at the target, snapshot a
	// copy and stop.
	dfs = func(node int) {
		if node == target {
			done := make([]int, len(path))
			copy(done, path)
			paths = append(paths, done)
			return
		}
		for _, nxt := range graph[node] {
			// Backtrack: shrink after returning so sibling branches
			// each see a clean path. No visited set is needed —
			// paths legitimately share prefixes.
			path = append(path, nxt)
			dfs(nxt)
			path = path[:len(path)-1]
		}
	}

	dfs(0)
	return paths
}
