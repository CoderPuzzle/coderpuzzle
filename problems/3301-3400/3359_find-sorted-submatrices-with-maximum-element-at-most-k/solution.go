// Sweep row by row. run[j] is the longest non-increasing run of cells <= k
// ending at column j in the current row, so a column span of width w
// ending at j is row-valid exactly when run[j] >= w. Per column, a
// monotonic stack of the run lengths seen so far keeps the running sum of
// minima over every stack segment; that sum counts the submatrices whose
// bottom-right corner is the current cell. The count reaches
// C(m+1,2)*C(n+1,2) ~ 2.5*10^11, past 32 bits, so the sums live in int64.
func countSubmatrices(grid [][]int, k int) int64 {
	m := len(grid)
	n := len(grid[0])
	stackVal := make([]int, m*n)
	stackWid := make([]int, m*n)
	tops := make([]int, n)
	sums := make([]int64, n)
	var total int64
	for i := 0; i < m; i++ {
		row := grid[i]
		prevVal, prevRun := 0, 0
		for j := 0; j < n; j++ {
			v := row[j]
			r := 1
			if v > k {
				r = 0
			} else if prevRun > 0 && prevVal >= v {
				r = prevRun + 1
			}
			base := j * m
			t := tops[j]
			s := sums[j]
			w := 1
			for t > 0 && stackVal[base+t-1] >= r {
				t--
				s -= int64(stackVal[base+t]) * int64(stackWid[base+t])
				w += stackWid[base+t]
			}
			stackVal[base+t] = r
			stackWid[base+t] = w
			tops[j] = t + 1
			s += int64(r) * int64(w)
			sums[j] = s
			total += s
			prevVal = v
			prevRun = r
		}
	}
	return total
}
