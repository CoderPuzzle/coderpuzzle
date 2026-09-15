// A path may reuse roads, so any road inside the connected component of
// city 1 can be crossed on a detour and included in the path's score.
// The answer is therefore the smallest distance among the roads of that
// component. Union every road, then scan for the minimum road fully
// inside city 1's component.
func minScore(n int, roads [][]int) int {
	parent := make([]int, n+1)
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
	unite := func(a, b int) {
		ra, rb := find(a), find(b)
		if ra != rb {
			parent[ra] = rb
		}
	}

	for _, r := range roads {
		unite(r[0], r[1])
	}
	root := find(1)
	best := 1000000000
	for _, r := range roads {
		if find(r[0]) == root && r[2] < best {
			best = r[2]
		}
	}
	return best
}
