import "sort"

type edgePair struct {
	v int
	w int64
}

func maximizeSumOfWeights(edges [][]int, k int) int64 {
	n := 0
	for _, e := range edges {
		if e[0] > n {
			n = e[0]
		}
		if e[1] > n {
			n = e[1]
		}
	}
	n++
	adj := make([][]edgePair, n)
	for _, e := range edges {
		u, v, w := e[0], e[1], int64(e[2])
		adj[u] = append(adj[u], edgePair{v, w})
		adj[v] = append(adj[v], edgePair{u, w})
	}

	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	order := make([]int, 0, n)
	parent[0] = 0
	stack := []int{0}
	for len(stack) > 0 {
		u := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		order = append(order, u)
		for _, p := range adj[u] {
			if p.v == parent[u] {
				continue
			}
			parent[p.v] = u
			stack = append(stack, p.v)
		}
	}

	// g[u]: best subtree sum when the edge to u's parent is NOT kept.
	// f[u]: best subtree sum when the edge to u's parent IS kept.
	g := make([]int64, n)
	f := make([]int64, n)
	gains := make([]int64, 0, n)
	for oi := len(order) - 1; oi >= 0; oi-- {
		u := order[oi]
		var total int64
		gains = gains[:0]
		for _, p := range adj[u] {
			if parent[p.v] == u {
				total += g[p.v]
				gains = append(gains, p.w+f[p.v]-g[p.v])
			}
		}
		sort.Slice(gains, func(a, b int) bool { return gains[a] > gains[b] })
		take := k
		if take > len(gains) {
			take = len(gains)
		}
		take1 := k - 1
		if take1 < 0 {
			take1 = 0
		}
		if take1 > len(gains) {
			take1 = len(gains)
		}
		s0 := total
		s1 := total
		for i := 0; i < take; i++ {
			if gains[i] > 0 {
				s0 += gains[i]
			}
		}
		for i := 0; i < take1; i++ {
			if gains[i] > 0 {
				s1 += gains[i]
			}
		}
		g[u] = s0
		f[u] = s1
	}
	return g[0]
}
