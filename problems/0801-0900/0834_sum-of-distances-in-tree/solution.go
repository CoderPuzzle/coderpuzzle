func sumOfDistancesInTree(n int, edges [][]int) []int {
	adj := make([][]int, n)
	for _, e := range edges {
		a, b := e[0], e[1]
		adj[a] = append(adj[a], b)
		adj[b] = append(adj[b], a)
	}

	// Iterative DFS from node 0: parents and a top-down visit order.
	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	order := make([]int, 0, n)
	seen := make([]bool, n)
	seen[0] = true
	order = append(order, 0)
	for head := 0; head < len(order); head++ {
		u := order[head]
		for _, v := range adj[u] {
			if !seen[v] {
				seen[v] = true
				parent[v] = u
				order = append(order, v)
			}
		}
	}

	sub := make([]int64, n)
	dist := make([]int64, n)
	for i := range sub {
		sub[i] = 1
	}
	// Bottom-up pass: dist[u] = sum over children of (dist[v] + sub[v]).
	for i := len(order) - 1; i >= 0; i-- {
		u := order[i]
		for _, v := range adj[u] {
			if v == parent[u] {
				continue
			}
			sub[u] += sub[v]
			dist[u] += dist[v] + sub[v]
		}
	}

	ans := make([]int, n)
	ans[0] = int(dist[0])
	// Top-down re-rooting pass.
	for _, u := range order {
		for _, v := range adj[u] {
			if v == parent[u] {
				continue
			}
			ans[v] = int(int64(ans[u]) - sub[v] + (int64(n) - sub[v]))
		}
	}
	return ans
}
