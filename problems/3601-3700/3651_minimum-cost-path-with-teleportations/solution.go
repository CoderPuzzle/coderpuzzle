import "sort"

func minCost(grid [][]int, k int) int {
	m, n := len(grid), len(grid[0])
	const inf = int64(1) << 62
	// Layer 0 is the plain right/down minimum path sum: every move pays
	// its destination cell, and standing on the start costs nothing.
	d := make([][]int64, m)
	for i := range d {
		d[i] = make([]int64, n)
		for j := range d[i] {
			d[i][j] = inf
		}
	}
	d[0][0] = 0
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if i == 0 && j == 0 {
				continue
			}
			best := inf
			if i > 0 && d[i-1][j] < best {
				best = d[i-1][j]
			}
			if j > 0 && d[i][j-1] < best {
				best = d[i][j-1]
			}
			d[i][j] = best + int64(grid[i][j])
		}
	}
	// Each further layer opens with one teleport: land anywhere whose
	// value is at least mine, at the previous layer's price of that launch
	// cell. Cells sorted by value descending turn the scan into a running
	// prefix minimum; ties share one prefix because the test is >=.
	cells := make([]struct {
		i, j, v int
	}, 0, m*n)
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			cells = append(cells, struct{ i, j, v int }{i, j, grid[i][j]})
		}
	}
	sort.Slice(cells, func(a, b int) bool { return cells[a].v > cells[b].v })
	answer := d[m-1][n-1]
	for step := 0; step < k; step++ {
		seed := make([][]int64, m)
		for i := range seed {
			seed[i] = make([]int64, n)
			for j := range seed[i] {
				seed[i][j] = inf
			}
		}
		run := inf
		p := 0
		for _, c := range cells {
			for p < len(cells) && cells[p].v >= c.v {
				if r := d[cells[p].i][cells[p].j]; r < run {
					run = r
				}
				p++
			}
			seed[c.i][c.j] = run
		}
		// Then ordinary right/down moves carry each landing spot through
		// the rest of the layer, as in the plain path-sum pass above.
		for i := 0; i < m; i++ {
			for j := 0; j < n; j++ {
				best := seed[i][j]
				g := int64(grid[i][j])
				if i > 0 && seed[i-1][j]+g < best {
					best = seed[i-1][j] + g
				}
				if j > 0 && seed[i][j-1]+g < best {
					best = seed[i][j-1] + g
				}
				seed[i][j] = best
			}
		}
		d = seed
		if d[m-1][n-1] < answer {
			answer = d[m-1][n-1]
		}
	}
	return int(answer)
}
