func networkDelayTime(times [][]int, n int, k int) int {
	const inf = 100000000
	d := make([][]int, n+1)
	for i := range d {
		d[i] = make([]int, n+1)
		for j := range d[i] {
			d[i][j] = inf
		}
		d[i][i] = 0
	}
	for _, t := range times {
		if t[2] < d[t[0]][t[1]] { // keep the smallest parallel-edge weight
			d[t[0]][t[1]] = t[2]
		}
	}
	// Relax every path through each midpoint m: one shot gives all pairs.
	for m := 1; m <= n; m++ {
		for i := 1; i <= n; i++ {
			for j := 1; j <= n; j++ {
				// The finite guards keep inf + inf from overflowing.
				if d[i][m] < inf && d[m][j] < inf && d[i][m]+d[m][j] < d[i][j] {
					d[i][j] = d[i][m] + d[m][j]
				}
			}
		}
	}
	best := -1
	for j := 1; j <= n; j++ {
		// Anything still inf in row k is unreachable from the source.
		if d[k][j] >= inf {
			return -1
		}
		if d[k][j] > best {
			best = d[k][j]
		}
	}
	return best
}
