import "sort"

// Per subtree keep the three largest and the two smallest cost values: the
// maximum product of three distinct nodes is either the three largest or the
// two smallest times the largest. Subtrees can be one long chain (n up to
// 2 * 10^4), so the traversal collects parents by BFS and merges children in
// reverse BFS order.
func placedCoins(edges [][]int, cost []int) []int64 {
	n := len(cost)
	adj := make([][]int, n)
	for _, edge := range edges {
		adj[edge[0]] = append(adj[edge[0]], edge[1])
		adj[edge[1]] = append(adj[edge[1]], edge[0])
	}

	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	order := make([]int, 0, n)
	order = append(order, 0)
	for head := 0; head < len(order); head++ {
		u := order[head]
		for _, v := range adj[u] {
			if v != parent[u] {
				parent[v] = u
				order = append(order, v)
			}
		}
	}

	ans := make([]int64, n)
	size := make([]int, n)
	for i := range size {
		size[i] = 1
	}
	top := make([][]int64, n) // up to 3 largest, descending
	bot := make([][]int64, n) // up to 2 smallest, ascending
	for i := 0; i < n; i++ {
		top[i] = []int64{int64(cost[i])}
		bot[i] = []int64{int64(cost[i])}
	}
	for k := n - 1; k >= 0; k-- {
		u := order[k]
		if size[u] < 3 {
			ans[u] = 1
		} else {
			t := top[u]
			b := bot[u]
			best := t[0] * t[1] * t[2]
			if c := b[0] * b[1] * t[0]; c > best {
				best = c
			}
			if best < 0 {
				best = 0
			}
			ans[u] = best
		}
		p := parent[u]
		if p >= 0 {
			size[p] += size[u]
			merged := append(append([]int64{}, top[p]...), top[u]...)
			sort.Slice(merged, func(i, j int) bool { return merged[i] > merged[j] })
			if len(merged) > 3 {
				merged = merged[:3]
			}
			top[p] = merged
			merged = append(append([]int64{}, bot[p]...), bot[u]...)
			sort.Slice(merged, func(i, j int) bool { return merged[i] < merged[j] })
			if len(merged) > 2 {
				merged = merged[:2]
			}
			bot[p] = merged
		}
	}
	return ans
}
