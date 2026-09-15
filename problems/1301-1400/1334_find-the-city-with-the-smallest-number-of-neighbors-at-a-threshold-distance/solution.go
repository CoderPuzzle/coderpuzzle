func findTheCity(n int, edges [][]int, distanceThreshold int) int {
	// With n <= 100, compute all-pairs distances at once: 0 diagonal,
	// symmetric direct weights, INF elsewhere.
	const inf = 1 << 30
	dist := make([][]int, n)
	for i := range dist {
		dist[i] = make([]int, n)
		for j := range dist[i] {
			dist[i][j] = inf
		}
		dist[i][i] = 0
	}
	for _, e := range edges {
		a, b, w := e[0], e[1], e[2]
		dist[a][b] = w
		dist[b][a] = w
	}
	// Floyd-Warshall: relax dist[i][j] through intermediate node k. The inf
	// guards skip pairs that cannot improve anything this pass.
	for k := 0; k < n; k++ {
		dk := dist[k]
		for i := 0; i < n; i++ {
			dik := dist[i][k]
			if dik == inf {
				continue
			}
			di := dist[i]
			for j := 0; j < n; j++ {
				if dk[j] == inf {
					continue
				}
				if dik+dk[j] < di[j] {
					di[j] = dik + dk[j]
				}
			}
		}
	}
	// Ascending scan with a strictly-smaller count (or equal count at a
	// larger index) implements the tie-break: greatest city number wins.
	bestCity, bestCount := -1, inf
	for i := 0; i < n; i++ {
		count := 0
		for j := 0; j < n; j++ {
			if j != i && dist[i][j] <= distanceThreshold {
				count++
			}
		}
		if count < bestCount || (count == bestCount && i > bestCity) {
			bestCity, bestCount = i, count
		}
	}
	return bestCity
}
