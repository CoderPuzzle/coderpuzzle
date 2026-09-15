import "sort"

func distanceLimitedPathsExist(n int, edgeList [][]int, queries [][]int) []bool {
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
	// Answer offline: the edge sets usable under growing limits are nested,
	// so union-find only ever grows. Sorting query indices (not the
	// queries) lets answers return to their original positions.
	edges := append([][]int(nil), edgeList...)
	sort.Slice(edges, func(a, b int) bool { return edges[a][2] < edges[b][2] })
	order := make([]int, len(queries))
	for i := range order {
		order[i] = i
	}
	sort.Slice(order, func(a, b int) bool { return queries[order[a]][2] < queries[order[b]][2] })
	answer := make([]bool, len(queries))
	ei := 0
	for _, qi := range order {
		p := queries[qi][0]
		q := queries[qi][1]
		limit := queries[qi][2]
		// Union every edge strictly below the limit — the strict < excludes
		// edges of weight exactly equal to it.
		for ei < len(edges) && edges[ei][2] < limit {
			ra := find(edges[ei][0])
			rb := find(edges[ei][1])
			if ra != rb {
				parent[ra] = rb
			}
			ei++
		}
		// The query reduces to a connectivity check.
		answer[qi] = find(p) == find(q)
	}
	return answer
}
