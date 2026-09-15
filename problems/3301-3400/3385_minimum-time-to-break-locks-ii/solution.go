func findMinimumTime(strength []int) int {
	// The k-th lock broken (1-indexed) is charged at factor k: its energy
	// grows by k each minute from 0, so it breaks after exactly
	// ceil(strength / k) minutes. Waiting longer never helps, and X
	// depends only on how many locks are already broken, so the total
	// time is sum over k of ceil(strength[order[k]] / k), minimized over
	// all break orders — a minimum-cost perfect matching between locks
	// and positions, solved by the O(n^3) Hungarian algorithm with
	// potentials.
	n := len(strength)
	cost := make([][]int64, n)
	for i := 0; i < n; i++ {
		cost[i] = make([]int64, n)
		for k := 0; k < n; k++ {
			cost[i][k] = int64((strength[i] + k) / (k + 1))
		}
	}
	inf := int64(1) << 60
	u := make([]int64, n+1)
	v := make([]int64, n+1)
	p := make([]int, n+1) // p[j] = 1-indexed row matched to column j
	way := make([]int, n+1)
	for i := 1; i <= n; i++ {
		p[0] = i
		j0 := 0
		minv := make([]int64, n+1)
		for j := range minv {
			minv[j] = inf
		}
		used := make([]bool, n+1)
		for {
			used[j0] = true
			i0 := p[j0]
			delta := inf
			j1 := 0
			for j := 1; j <= n; j++ {
				if !used[j] {
					cur := cost[i0-1][j-1] - u[i0] - v[j]
					if cur < minv[j] {
						minv[j] = cur
						way[j] = j0
					}
					if minv[j] < delta {
						delta = minv[j]
						j1 = j
					}
				}
			}
			for j := 0; j <= n; j++ {
				if used[j] {
					u[p[j]] += delta
					v[j] -= delta
				} else {
					minv[j] -= delta
				}
			}
			j0 = j1
			if p[j0] == 0 {
				break
			}
		}
		for j0 > 0 {
			j1 := way[j0]
			p[j0] = p[j1]
			j0 = j1
		}
	}
	var total int64
	for j := 1; j <= n; j++ {
		total += cost[p[j]-1][j-1]
	}
	return int(total)
}
