import "sort"

func criticalConnections(n int, connections [][]int) [][]int {
	graph := make([][]int, n)
	for _, e := range connections {
		graph[e[0]] = append(graph[e[0]], e[1])
		graph[e[1]] = append(graph[e[1]], e[0])
	}

	disc := make([]int, n)
	low := make([]int, n)
	for i := range disc {
		disc[i] = -1
	}
	timer := 0
	bridges := [][]int{}

	var dfs func(u, parent int)
	// Tarjan bridge finding: disc is the DFS discovery time, low the earliest
	// discovery reachable from u's subtree via tree edges plus at most one
	// back edge
	dfs = func(u, parent int) {
		disc[u] = timer
		low[u] = timer
		timer++
		for _, v := range graph[u] {
			if disc[v] == -1 {
				dfs(v, u)
				// fold the child's reach upward
				if low[v] < low[u] {
					low[u] = low[v]
				}
				// bridge iff v's subtree cannot see past u: this tree edge
				// is the only route between the two sides
				if low[v] > disc[u] {
					a, b := u, v
					if a > b {
						a, b = b, a
					}
					bridges = append(bridges, []int{a, b})
				}
			} else if v != parent {
				// back edge to a non-parent ancestor relaxes low; skipping
				// the parent matters — that edge is the tree edge itself
				if disc[v] < low[u] {
					low[u] = disc[v]
				}
			}
		}
	}

	// graph is connected, so one root reaches every server
	dfs(0, -1)
	// sort only for a deterministic output order
	sort.Slice(bridges, func(i, j int) bool {
		if bridges[i][0] != bridges[j][0] {
			return bridges[i][0] < bridges[j][0]
		}
		return bridges[i][1] < bridges[j][1]
	})
	return bridges
}
