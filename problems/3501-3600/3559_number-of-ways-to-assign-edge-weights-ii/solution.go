func assignEdgeWeights(edges [][]int, queries [][]int) []int {
	// As in part I, a path of d edges has odd cost for exactly 2^(d-1)
	// of its 2^d assignments (d = 0 answers 0), so each query only
	// needs the path length d = depth[u] + depth[v] - 2 * depth[lca].
	// Binary lifting answers every LCA in O(log n); the tree is rooted
	// with an explicit stack because it can be a 10^5-node chain.
	const mod = 1_000_000_007
	n := len(edges) + 1
	adj := make([][]int, n+1)
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], e[1])
		adj[e[1]] = append(adj[e[1]], e[0])
	}
	depth := make([]int, n+1)
	parent := make([]int, n+1)
	seen := make([]bool, n+1)
	seen[1] = true
	stack := []int{1}
	for len(stack) > 0 {
		u := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		for _, v := range adj[u] {
			if !seen[v] {
				seen[v] = true
				parent[v] = u
				depth[v] = depth[u] + 1
				stack = append(stack, v)
			}
		}
	}
	log := 1
	for 1<<log < n {
		log++
	}
	up := make([][]int, log)
	up[0] = parent
	for k := 1; k < log; k++ {
		up[k] = make([]int, n+1)
		for v := 0; v <= n; v++ {
			up[k][v] = up[k-1][up[k-1][v]]
		}
	}
	p2 := make([]int, n)
	p2[0] = 1
	for i := 1; i < n; i++ {
		p2[i] = p2[i-1] * 2 % mod
	}
	answer := make([]int, len(queries))
	for qi, q := range queries {
		u, v := q[0], q[1]
		if depth[u] < depth[v] {
			u, v = v, u
		}
		du, dv := depth[u], depth[v]
		diff, k := du-dv, 0
		for diff > 0 {
			if diff&1 == 1 {
				u = up[k][u]
			}
			diff >>= 1
			k++
		}
		if u != v {
			for kk := log - 1; kk >= 0; kk-- {
				if up[kk][u] != up[kk][v] {
					u = up[kk][u]
					v = up[kk][v]
				}
			}
			v = parent[u]
		}
		d := du + dv - 2*depth[v]
		if d == 0 {
			answer[qi] = 0
		} else {
			answer[qi] = p2[d-1]
		}
	}
	return answer
}
