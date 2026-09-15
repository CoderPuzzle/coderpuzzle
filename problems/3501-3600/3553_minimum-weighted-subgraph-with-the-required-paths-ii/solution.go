func minimumWeight(edges [][]int, queries [][]int) []int64 {
	n := len(edges) + 1
	type node struct{ v, w int }
	adj := make([][]node, n)
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], node{e[1], e[2]})
		adj[e[1]] = append(adj[e[1]], node{e[0], e[2]})
	}

	// Root at 0; iterative traversal so deep chains cannot overflow the stack.
	depth := make([]int, n)
	dist := make([]int64, n)
	parent := make([]int, n)
	seen := make([]bool, n)
	seen[0] = true
	stack := []int{0}
	for len(stack) > 0 {
		u := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		for _, e := range adj[u] {
			if !seen[e.v] {
				seen[e.v] = true
				parent[e.v] = u
				depth[e.v] = depth[u] + 1
				dist[e.v] = dist[u] + int64(e.w)
				stack = append(stack, e.v)
			}
		}
	}

	// Binary lifting: up[k][v] is the 2^k-th ancestor of v (root's is root).
	log := 1
	for 1<<log <= n-1 {
		log++
	}
	up := make([][]int, log)
	up[0] = parent
	for k := 1; k < log; k++ {
		prev := up[k-1]
		cur := make([]int, n)
		for v := 0; v < n; v++ {
			cur[v] = prev[prev[v]]
		}
		up[k] = cur
	}

	lca := func(x, y int) int {
		if depth[x] < depth[y] {
			x, y = y, x
		}
		diff := depth[x] - depth[y]
		for k := 0; diff > 0; k, diff = k+1, diff>>1 {
			if diff&1 == 1 {
				x = up[k][x]
			}
		}
		if x == y {
			return x
		}
		for k := log - 1; k >= 0; k-- {
			if up[k][x] != up[k][y] {
				x = up[k][x]
				y = up[k][y]
			}
		}
		return up[0][x]
	}
	distance := func(x, y int) int64 {
		return dist[x] + dist[y] - 2*dist[lca(x, y)]
	}

	// The minimal subtree joining a, b, c is the union of the three paths,
	// each edge lying on exactly two of them.
	answer := make([]int64, len(queries))
	for j, q := range queries {
		answer[j] = (distance(q[0], q[1]) + distance(q[1], q[2]) + distance(q[2], q[0])) / 2
	}
	return answer
}
