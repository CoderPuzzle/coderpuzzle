func assignEdgeWeights(edges [][]int) int {
	// A weight of 2 never changes parity, so only the number of 1s on
	// the path to a deepest node matters: any odd-size subset of the
	// d = max depth edges gives an odd cost, and there are 2^(d-1) of
	// those. An iterative DFS finds d (the tree can be a long chain).
	const mod = 1_000_000_007
	n := len(edges) + 1
	adj := make([][]int, n+1)
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], e[1])
		adj[e[1]] = append(adj[e[1]], e[0])
	}
	depth := make([]int, n+1)
	for i := range depth {
		depth[i] = -1
	}
	depth[1] = 0
	stack := []int{1}
	maxDepth := 0
	for len(stack) > 0 {
		u := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		for _, v := range adj[u] {
			if depth[v] < 0 {
				depth[v] = depth[u] + 1
				if depth[v] > maxDepth {
					maxDepth = depth[v]
				}
				stack = append(stack, v)
			}
		}
	}
	ways := int64(1)
	for i := 0; i < maxDepth-1; i++ {
		ways = ways * 2 % mod
	}
	return int(ways)
}
