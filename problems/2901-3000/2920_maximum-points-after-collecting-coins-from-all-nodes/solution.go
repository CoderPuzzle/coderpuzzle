// dp[v][t] = best points from v's subtree when t ancestral halvings
// already apply to coins[v]. Halving composes with the shift and
// coins <= 10^4 < 2^14 die after 14 halvings, so the table is 15 wide.
// The total reaches n * max(coins) = 10^9, kept in int64 for headroom.
// Traversal is iterative: a path tree is 10^5 deep.
func maximumPoints(edges [][]int, coins []int, k int) int64 {
	n := len(coins)
	adj := make([][]int, n)
	for _, e := range edges {
		a, b := e[0], e[1]
		adj[a] = append(adj[a], b)
		adj[b] = append(adj[b], a)
	}

	// Root at 0 once: BFS fixes parents and a top-down visit order, so
	// every later pass walks flat arrays and nothing recurses.
	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	order := make([]int, 0, n)
	order = append(order, 0)
	for head := 0; head < len(order); head++ {
		u := order[head]
		for _, v := range adj[u] {
			if parent[v] == -1 && v != 0 {
				parent[v] = u
				order = append(order, v)
			}
		}
	}

	// Bottom-up over reverse BFS order; s[v][t] accumulates the
	// children's dp column so each node finalizes in O(15). Column 15
	// stays 0 forever (the absorbed state).
	s := make([][16]int64, n)
	dp := make([][16]int64, n)
	for i := n - 1; i >= 0; i-- {
		v := order[i]
		c := int64(coins[v])
		for t := 0; t < 15; t++ {
			// First way: take the k hit (it may be negative). Second
			// way: halve, and the children inherit t + 1.
			way1 := (c >> t) - int64(k) + s[v][t]
			way2 := (c >> (t + 1)) + s[v][t+1]
			dp[v][t] = max(way1, way2)
		}
		if p := parent[v]; p >= 0 {
			for t := 0; t < 15; t++ {
				s[p][t] += dp[v][t]
			}
		}
	}
	return dp[0][0]
}
