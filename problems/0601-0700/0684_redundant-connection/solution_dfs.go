func findRedundantConnection(edges [][]int) []int {
	adj := make(map[int][]int)

	connected := func(a, b int) bool {
		stack := []int{a}
		seen := map[int]bool{a: true}
		// The stack explores depth-first and marks nodes on push, so each
		// node enters it at most once per probe.
		for len(stack) > 0 {
			u := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			if u == b {
				return true
			}
			for _, v := range adj[u] {
				if !seen[v] {
					seen[v] = true
					stack = append(stack, v)
				}
			}
		}
		return false
	}

	// A tree plus one extra edge has exactly one cycle; the first edge
	// that closes it is the one to remove.
	for _, edge := range edges {
		// Probe before inserting: if b is already reachable from a
		// through the edges added so far, this edge closes the cycle.
		if connected(edge[0], edge[1]) {
			return edge
		}
		// A safe edge joins two previously separate parts: register it
		// in both directions and keep scanning.
		adj[edge[0]] = append(adj[edge[0]], edge[1])
		adj[edge[1]] = append(adj[edge[1]], edge[0])
	}
	return nil
}
