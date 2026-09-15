import "sort"

func findCriticalAndPseudoCriticalEdges(n int, edges [][]int) [][]int {
	m := len(edges)

	order := make([]int, m)
	for i := range order {
		order[i] = i
	}
	sort.SliceStable(order, func(a, b int) bool {
		return edges[order[a]][2] < edges[order[b]][2]
	})

	newDsu := func() ([]int, []int) {
		par := make([]int, n)
		sz := make([]int, n)
		for i := 0; i < n; i++ {
			par[i] = i
			sz[i] = 1
		}
		return par, sz
	}
	find := func(par []int, x int) int {
		for par[x] != x {
			par[x] = par[par[x]]
			x = par[x]
		}
		return x
	}
	union := func(par []int, sz []int, a int, b int) bool {
		a = find(par, a)
		b = find(par, b)
		if a == b {
			return false
		}
		if sz[a] < sz[b] {
			a, b = b, a
		}
		par[b] = a
		sz[a] += sz[b]
		return true
	}

	// base MST weight
	baseWeight := 0
	{
		par, sz := newDsu()
		for _, idx := range order {
			if union(par, sz, edges[idx][0], edges[idx][1]) {
				baseWeight += edges[idx][2]
			}
		}
	}

	// Kruskal skipping edge skip (>= 0) and/or forcing edge force (>= 0) in first.
	// Returns a huge value when no spanning tree can be formed.
	mstWeight := func(skip int, force int) int {
		par, sz := newDsu()
		weight := 0
		used := 0
		if force >= 0 {
			union(par, sz, edges[force][0], edges[force][1])
			weight += edges[force][2]
			used++
		}
		for _, idx := range order {
			if idx == skip {
				continue
			}
			if union(par, sz, edges[idx][0], edges[idx][1]) {
				weight += edges[idx][2]
				used++
			}
		}
		if used == n-1 {
			return weight
		}
		return 1 << 30
	}

	critical := []int{}
	pseudo := []int{}
	// Deletion raising the weight (or disconnecting, seen as the huge value)
	// marks an edge critical; the forcing test runs only on survivors,
	// because a critical edge would also pass it.
	for i := 0; i < m; i++ {
		if mstWeight(i, -1) > baseWeight {
			critical = append(critical, i)
		} else if mstWeight(-1, i) == baseWeight {
			pseudo = append(pseudo, i)
		}
	}
	// loops ascend, so both lists are already sorted
	return [][]int{critical, pseudo}
}
