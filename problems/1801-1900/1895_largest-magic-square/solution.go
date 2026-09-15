func largestMagicSquare(grid [][]int) int {
	// Four prefix tables; per-window line sums are O(1).
	m, n := len(grid), len(grid[0])
	rs := make([][]int64, m+1)
	cs := make([][]int64, m+1)
	d1 := make([][]int64, m+1)
	a2 := make([][]int64, m+1)
	for i := range rs {
		rs[i] = make([]int64, n+1)
		cs[i] = make([]int64, n+1)
		d1[i] = make([]int64, n+2)
		a2[i] = make([]int64, n+2)
	}
	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			v := int64(grid[i-1][j-1])
			rs[i][j] = rs[i][j-1] + v
			cs[i][j] = cs[i-1][j] + v
			d1[i][j] = v + d1[i-1][j-1]
		}
	}
	for i := 1; i <= m; i++ {
		for j := n; j >= 1; j-- {
			a2[i][j] = int64(grid[i-1][j-1]) + a2[i-1][j+1]
		}
	}
	rsum := func(i, j, k int) int64 { return rs[i+1][j+k] - rs[i+1][j] }
	csum := func(i, j, k int) int64 { return cs[i+k][j+1] - cs[i][j+1] }
	for k := min(m, n); k >= 1; k-- {
		for i := 0; i+k <= m; i++ {
			for j := 0; j+k <= n; j++ {
				s := rsum(i, j, k)
				ok := true
				for t := 1; t < k && ok; t++ {
					ok = rsum(i+t, j, k) == s
				}
				for t := 0; t < k && ok; t++ {
					ok = csum(i, j+t, k) == s
				}
				if ok {
					ok = d1[i+k][j+k]-d1[i][j] == s
				}
				if ok {
					ok = a2[i+k][j+1]-a2[i][j+1+k] == s
				}
				if ok {
					return k
				}
			}
		}
	}
	return 1
}
