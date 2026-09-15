import "math/bits"

func minimumWeight(edges [][]int, queries [][]int) []int64 {
	n := len(edges) + 1
	type node struct{ v, w int }
	adj := make([][]node, n)
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], node{e[1], e[2]})
		adj[e[1]] = append(adj[e[1]], node{e[0], e[2]})
	}

	// Root at 0 and walk an Euler tour iteratively, so deep chains cannot
	// overflow the call stack. Every node enters the tour at its first visit
	// and re-enters each time a child's subtree closes, giving 2n - 1
	// entries; first[v] is v's earliest slot in that sequence.
	depth := make([]int, n)
	dist := make([]int64, n)
	parent := make([]int, n)
	parent[0] = -1
	first := make([]int, n)
	it := make([]int, n)
	tour := make([]int, 0, 2*n-1)
	stack := []int{0}
	tour = append(tour, 0)
	for len(stack) > 0 {
		u := stack[len(stack)-1]
		if it[u] < len(adj[u]) {
			e := adj[u][it[u]]
			it[u]++
			if e.v != parent[u] {
				parent[e.v] = u
				depth[e.v] = depth[u] + 1
				dist[e.v] = dist[u] + int64(e.w)
				first[e.v] = len(tour)
				tour = append(tour, e.v)
				stack = append(stack, e.v)
			}
		} else {
			stack = stack[:len(stack)-1]
			if len(stack) > 0 {
				tour = append(tour, stack[len(stack)-1])
			}
		}
	}
	m := len(tour)

	// Sparse table: table[k][i] is the shallowest node over the 2^k tour
	// entries from i - the range argmin under depth comparison.
	log := 1
	for 1<<log <= m {
		log++
	}
	table := make([][]int, log)
	table[0] = tour
	for k := 1; k < log; k++ {
		prev := table[k-1]
		half := 1 << (k - 1)
		length := m - (1 << k) + 1
		cur := make([]int, length)
		for i := 0; i < length; i++ {
			if depth[prev[i+half]] < depth[prev[i]] {
				cur[i] = prev[i+half]
			} else {
				cur[i] = prev[i]
			}
		}
		table[k] = cur
	}

	lca := func(x, y int) int {
		l, r := first[x], first[y]
		if l > r {
			l, r = r, l
		}
		k := bits.Len(uint(r-l+1)) - 1
		a, b := table[k][l], table[k][r-(1<<k)+1]
		if depth[a] > depth[b] {
			a = b
		}
		return a
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
