import "math"

func minCostConnectPoints(points [][]int) int64 {
	n := len(points)
	if n <= 1 {
		return 0
	}
	inf := int64(math.MaxInt64)
	// best[v]: cheapest Manhattan distance from any tree vertex to the
	// outside vertex v; best[0] = 0 makes the seed point free.
	best := make([]int64, n)
	for i := range best {
		best[i] = inf
	}
	best[0] = 0
	used := make([]bool, n)
	total := int64(0)
	for step := 0; step < n; step++ {
		// Cheapest edge leaving the current tree — safe to add by Prim's
		// cut property.
		u := -1
		for v := 0; v < n; v++ {
			if !used[v] && (u == -1 || best[v] < best[u]) {
				u = v
			}
		}
		total += best[u]
		used[u] = true
		// Relax every outside vertex against the newly attached u.
		for v := 0; v < n; v++ {
			if !used[v] {
				d := int64(abs(points[u][0]-points[v][0]) + abs(points[u][1]-points[v][1]))
				if d < best[v] {
					best[v] = d
				}
			}
		}
	}
	return total
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
