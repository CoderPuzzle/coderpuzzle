func maxOutput(n int, edges [][]int, price []int) int64 {
	if n == 1 {
		return 0
	}
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

	// d[v]: best price sum of an "arm", a vertical path starting at v
	// and descending into v's subtree. t1/t2/t1src remember the best two
	// child arms per node so the downward pass can hand each child its
	// "best arm excluding your own branch" value. Path sums reach
	// n * max(price) = 10^10, beyond int32 range, hence int64.
	d := make([]int64, n)
	t1 := make([]int64, n)
	t2 := make([]int64, n)
	up := make([]int64, n)
	t1src := make([]int, n)
	for i := range t1src {
		t1src[i] = -1
	}
	for i := n - 1; i >= 0; i-- {
		v := order[i]
		d[v] = int64(price[v]) + t1[v]
		if p := parent[v]; p >= 0 {
			if d[v] > t1[p] {
				t2[p] = t1[p]
				t1[p] = d[v]
				t1src[p] = v
			} else if d[v] > t2[p] {
				t2[p] = d[v]
			}
		}
	}

	// Rerooting. The minimum path at any root is always the lone root,
	// which cancels against its own price inside every arm sum, so the
	// asked difference is exactly the largest arm leaving each node:
	// either straight down into a child subtree (t1) or climbing out
	// through the parent (up).
	ans := t1[0]
	for i := 1; i < n; i++ {
		v := order[i]
		p := parent[v]
		others := t1[p]
		if t1src[p] == v {
			others = t2[p]
		}
		best := others
		if up[p] > best {
			best = up[p]
		}
		up[v] = int64(price[p]) + best
		if t1[v] > ans {
			ans = t1[v]
		}
		if up[v] > ans {
			ans = up[v]
		}
	}
	return ans
}
