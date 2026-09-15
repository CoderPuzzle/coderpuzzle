func findShortestCycle(n int, edges [][]int) int {
	// BFS from every vertex: non-tree edges (u, v) close cycles of length
	// dist[u] + dist[v] + 1 through the root's levels, and scanning all
	// roots measures every cycle at one of its own vertices.
	adj := make([][]int, n)
	for _, edge := range edges {
		adj[edge[0]] = append(adj[edge[0]], edge[1])
		adj[edge[1]] = append(adj[edge[1]], edge[0])
	}
	best := -1
	dist := make([]int, n)
	parent := make([]int, n)
	queue := make([]int, n)
	for start := 0; start < n; start++ {
		for v := range dist {
			dist[v] = -1
			parent[v] = -1
		}
		dist[start] = 0
		queue[0] = start
		head, tail := 0, 1
		for head < tail {
			u := queue[head]
			head++
			for _, v := range adj[u] {
				if dist[v] == -1 {
					dist[v] = dist[u] + 1
					parent[v] = u
					queue[tail] = v
					tail++
				} else if parent[u] != v && parent[v] != u {
					// Tree edges would double-count one path instead of
					// closing a ring, so only genuine cross links count.
					if length := dist[u] + dist[v] + 1; best == -1 || length < best {
						best = length
					}
				}
			}
		}
	}
	return best
}
