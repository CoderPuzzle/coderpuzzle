import "sort"

func minTime(n int, edges [][]int, k int) int {
	parent := make([]int, n)
	for i := range parent {
		parent[i] = i
	}

	var find func(int) int
	find = func(x int) int {
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}
	union := func(a, b int) bool {
		ra, rb := find(a), find(b)
		if ra == rb {
			return false
		}
		parent[ra] = rb
		return true
	}

	// Reverse Kruskal: sweep edges from longest-lived to shortest so the
	// union-find mirrors the graph with every edge of time <= t removed.
	ordered := make([][]int, len(edges))
	copy(ordered, edges)
	sort.Slice(ordered, func(a, b int) bool {
		return ordered[a][2] > ordered[b][2]
	})

	components := n
	answer := 0
	i := 0
	m := len(ordered)
	for i < m {
		t := ordered[i][2]
		// Pre-merge state: every edge of time <= t is gone. If the count
		// already reaches k, t works; later overwrites keep the minimum.
		if components >= k {
			answer = t
		}
		// Merge the whole equal-time group so a partially merged group is
		// never mistaken for a valid intermediate state.
		for i < m && ordered[i][2] == t {
			// A redundant edge (no-op union) does not decrement the count.
			if union(ordered[i][0], ordered[i][1]) {
				components--
			}
			i++
		}
	}
	// The full graph itself may already have >= k components: answer 0.
	if components >= k {
		answer = 0
	}
	return answer
}
