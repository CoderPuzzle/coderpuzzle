import "sort"

func maxPartitionFactor(points [][]int) int {
	n := len(points)
	// Both groups are singletons, so no intra-group pair exists and the
	// factor is 0 by definition.
	if n == 2 {
		return 0
	}
	dist := make([][]int, n)
	for i := range dist {
		dist[i] = make([]int, n)
		for j := range dist[i] {
			dist[i][j] = abs(points[i][0]-points[j][0]) + abs(points[i][1]-points[j][1])
		}
	}
	// The factor of any split is 0 or one of the inter-point distances, so
	// binary search probes those candidate thresholds only.
	candidates := []int{0}
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			candidates = append(candidates, dist[i][j])
		}
	}
	sort.Ints(candidates)
	unique := candidates[:1]
	for _, value := range candidates[1:] {
		if value != unique[len(unique)-1] {
			unique = append(unique, value)
		}
	}
	// Raising the threshold only adds conflict edges, so feasibility is
	// monotone and the largest separable threshold is the answer.
	lo, hi := 0, len(unique)-1
	for lo < hi {
		mid := lo + (hi-lo+1)/2
		if separable(dist, n, unique[mid]) {
			lo = mid
		} else {
			hi = mid - 1
		}
	}
	return unique[lo]
}

// separable reports whether every pair closer than limit can be split
// across the two groups -- its conflict graph is bipartite.
func separable(dist [][]int, n int, limit int) bool {
	color := make([]int, n)
	for i := range color {
		color[i] = -1
	}
	stack := make([]int, 0, n)
	for start := 0; start < n; start++ {
		if color[start] != -1 {
			continue
		}
		color[start] = 0
		stack = append(stack[:0], start)
		for len(stack) > 0 {
			u := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			cu := color[u]
			for v := 0; v < n; v++ {
				if v == u || dist[u][v] >= limit {
					continue
				}
				if color[v] == -1 {
					color[v] = cu ^ 1
					stack = append(stack, v)
				} else if color[v] == cu {
					return false
				}
			}
		}
	}
	return true
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
