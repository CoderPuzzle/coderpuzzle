// Scores can only be raised, so every root-to-leaf path must reach
// M = largest raw path sum. Let f[v] be the largest raw path sum through v;
// the total raise owed inside v's subtree is g[v] = M - f[v]. g never
// decreases downward, so an increase is unavoidable exactly when
// g[v] > g[parent]: that jump cannot be charged any higher. Sums reach
// 1e5 * 1e9 = 1e14, so the walk is int64.
func minIncrease(n int, edges [][]int, cost []int) int {
	adj := make([][]int, n)
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], e[1])
		adj[e[1]] = append(adj[e[1]], e[0])
	}
	// Iterative rooted ordering (trees here can be a single long path).
	parent := make([]int, n)
	order := make([]int, 0, n)
	seen := make([]bool, n)
	seen[0] = true
	order = append(order, 0)
	for i := 0; i < len(order); i++ {
		v := order[i]
		for _, w := range adj[v] {
			if !seen[w] {
				seen[w] = true
				parent[w] = v
				order = append(order, w)
			}
		}
	}
	// Pass 1 (bottom-up): down[v] = largest raw suffix sum v..leaf.
	down := make([]int64, n)
	for i := n - 1; i >= 0; i-- {
		v := order[i]
		var best int64
		for _, w := range adj[v] {
			if parent[w] == v && down[w] > best {
				best = down[w]
			}
		}
		down[v] = int64(cost[v]) + best
	}
	// Pass 2 (top-down): f[v] = raw prefix above v + down[v]; propagate the
	// running minimum of f, and count the strict drops of f, which are
	// exactly the jumps of g.
	prefix := make([]int64, n)
	f := make([]int64, n)
	prefix[0] = int64(cost[0])
	f[0] = down[0]
	ans := 0
	for i := 1; i < n; i++ {
		v := order[i]
		p := parent[v]
		prefix[v] = prefix[p] + int64(cost[v])
		fv := prefix[p] + down[v]
		if fv < f[p] {
			ans++
			f[v] = fv
		} else {
			f[v] = f[p]
		}
	}
	return ans
}
