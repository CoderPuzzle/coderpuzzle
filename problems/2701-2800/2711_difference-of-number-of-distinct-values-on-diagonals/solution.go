func differenceOfDistinctValues(grid [][]int) [][]int {
	// Each main diagonal is swept once downward and once upward. The
	// downward pass records, per cell, how many distinct values lie
	// strictly left-above (the running set size before inserting the
	// cell itself); the upward pass rebuilds the same count for
	// right-below and combines the two.
	m := len(grid)
	n := len(grid[0])
	ans := make([][]int, m)
	for i := range ans {
		ans[i] = make([]int, n)
	}
	type pair struct{ r, c int }
	starts := []pair{}
	for r := 0; r < m; r++ {
		starts = append(starts, pair{r, 0})
	}
	for c := 1; c < n; c++ {
		starts = append(starts, pair{0, c})
	}
	for _, s := range starts {
		leftAbove := map[int]bool{}
		length := 0
		r, c := s.r, s.c
		for r < m && c < n {
			ans[r][c] = len(leftAbove)
			leftAbove[grid[r][c]] = true
			length++
			r++
			c++
		}
		rightBelow := map[int]bool{}
		for k := length - 1; k >= 0; k-- {
			x, y := s.r+k, s.c+k
			d := ans[x][y] - len(rightBelow)
			if d < 0 {
				d = -d
			}
			ans[x][y] = d
			rightBelow[grid[x][y]] = true
		}
	}
	return ans
}
