type st struct {
	m    map[int]int64
	a, b int64
}

func interactionCosts(n int, edges [][]int, group []int) int64 {
	adj := make([][]int, n)
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], e[1])
		adj[e[1]] = append(adj[e[1]], e[0])
	}

	// Breadth-first order from the root; parents discovered on the way.
	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	order := make([]int, 0, n)
	order = append(order, 0)
	for head := 0; head < len(order); head++ {
		node := order[head]
		for _, nxt := range adj[node] {
			if nxt != parent[node] {
				parent[nxt] = node
				order = append(order, nxt)
			}
		}
	}

	// Global size of each group label.
	k := make([]int64, n+1)
	for _, g := range group {
		k[g]++
	}

	// Each subtree state carries its group-count map plus
	// A = sum k[g]*cnt[g] and B = sum cnt[g]^2.
	states := make([]*st, n)
	var ans int64
	for i := n - 1; i >= 0; i-- {
		v := order[i]
		pv := parent[v]

		var base *st
		for _, c := range adj[v] {
			if c != pv && (base == nil || len(states[c].m) > len(base.m)) {
				base = states[c]
			}
		}
		if base == nil {
			base = &st{m: make(map[int]int64)}
		}

		g := group[v]
		base.m[g]++
		base.a += k[g]
		base.b += 2*(base.m[g]-1) + 1

		for _, c := range adj[v] {
			if c == pv || states[c] == base {
				continue
			}
			for gg, cc := range states[c].m {
				old := base.m[gg]
				base.a += k[gg] * cc
				base.b += 2*old*cc + cc*cc
				base.m[gg] = old + cc
			}
			states[c].m = nil
		}

		if v != 0 {
			// The edge above v carries sum of cnt*(k-cnt) = a - b.
			ans += base.a - base.b
		}
		states[v] = base
	}
	return ans
}
