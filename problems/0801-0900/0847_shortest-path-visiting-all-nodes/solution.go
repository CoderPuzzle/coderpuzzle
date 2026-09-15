func shortestPathLength(graph [][]int) int {
	n := len(graph)
	full := (1 << n) - 1
	// Walks may revisit nodes, so the state is (node, visited
	// bitmask) — at most n * 2^n states; the -1 sentinel doubles
	// as the visited marker.
	dist := make([][]int, n)
	for i := range dist {
		dist[i] = make([]int, 1<<n)
		for j := range dist[i] {
			dist[i][j] = -1
		}
	}
	type state struct{ node, mask int }
	queue := make([]state, 0, n*(1<<n))
	// Multi-source: seed every (i, 1 << i) at distance 0 and let
	// BFS discover the best starting node itself.
	for i := 0; i < n; i++ {
		dist[i][1<<i] = 0
		queue = append(queue, state{i, 1 << i})
	}
	for head := 0; head < len(queue); head++ {
		cur := queue[head]
		// First full mask popped is the shortest walk visiting
		// every node.
		if cur.mask == full {
			return dist[cur.node][cur.mask]
		}
		for _, nxt := range graph[cur.node] {
			// Stepping to a neighbor ORs in its bit; BFS explores
			// in nondecreasing distance, so the first reach of a
			// state carries the optimal count.
			nmask := cur.mask | (1 << nxt)
			if dist[nxt][nmask] == -1 {
				dist[nxt][nmask] = dist[cur.node][cur.mask] + 1
				queue = append(queue, state{nxt, nmask})
			}
		}
	}
	// Unreachable for the connected graphs the constraints promise.
	return 0
}
