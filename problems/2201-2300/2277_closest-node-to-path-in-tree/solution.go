// Breadth-first walk from the root records parents and depths without
// recursion, so chain-shaped trees cannot overflow the call stack; a
// binary-lifting table then answers lowest-common-ancestor queries
// iteratively in O(log n).
func closestNode(n int, edges [][]int, query [][]int) []int {
	adj := make([][]int, n)
	for _, e := range edges {
		a, b := e[0], e[1]
		adj[a] = append(adj[a], b)
		adj[b] = append(adj[b], a)
	}

	parent := make([]int, n)
	depth := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	visited := make([]bool, n)
	visited[0] = true
	order := []int{0}
	for head := 0; head < len(order); head++ {
		u := order[head]
		for _, v := range adj[u] {
			if !visited[v] {
				visited[v] = true
				parent[v] = u
				depth[v] = depth[u] + 1
				order = append(order, v)
			}
		}
	}

	// up[k][v] is the 2^k-th ancestor of v, or -1 once past the root.
	LOG := 1
	for ; (1 << LOG) < n; LOG++ {
	}
	up := make([][]int, LOG)
	up[0] = append([]int(nil), parent...)
	for k := 1; k < LOG; k++ {
		up[k] = make([]int, n)
		for v := 0; v < n; v++ {
			if mid := up[k-1][v]; mid != -1 {
				up[k][v] = up[k-1][mid]
			} else {
				up[k][v] = -1
			}
		}
	}

	lca := func(u, v int) int {
		if depth[u] < depth[v] {
			u, v = v, u
		}
		diff, k := depth[u]-depth[v], 0
		for diff > 0 {
			if diff&1 == 1 {
				u = up[k][u]
			}
			diff >>= 1
			k++
		}
		if u == v {
			return u
		}
		for k := LOG - 1; k >= 0; k-- {
			if up[k][u] != up[k][v] {
				u = up[k][u]
				v = up[k][v]
			}
		}
		return parent[u]
	}

	// The deepest of the three pairwise LCAs is where node's route
	// merges onto the start-end path -- always on the path, and the
	// unique minimizer of the distance to it.
	answer := make([]int, 0, len(query))
	for _, q := range query {
		s, e, x := q[0], q[1], q[2]
		best := lca(s, e)
		for _, cand := range [2]int{lca(s, x), lca(e, x)} {
			if depth[cand] > depth[best] {
				best = cand
			}
		}
		answer = append(answer, best)
	}
	return answer
}
