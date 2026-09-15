import (
	"sort"
)

func getBiggestThree(grid [][]int) []int64 {
	// Enumerate every (center, k) rhombus by walking its four edges;
	// keep distinct sums and return the three largest.
	m := len(grid)
	n := len(grid[0])
	sums := map[int64]bool{}
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			for k := 0; ; k++ {
				if r-k < 0 || r+k >= m || c-k < 0 || c+k >= n {
					break
				}
				var total int64
				if k == 0 {
					total = int64(grid[r][c])
				} else {
					for i := 0; i < k; i++ {
						total += int64(grid[r-k+i][c-i])
						total += int64(grid[r+i][c-k+i])
						total += int64(grid[r+k-i][c+i])
						total += int64(grid[r-i][c+k-i])
					}
				}
				sums[total] = true
			}
		}
	}
	out := make([]int64, 0, len(sums))
	for s := range sums {
		out = append(out, s)
	}
	sort.Slice(out, func(i, j int) bool { return out[i] > out[j] })
	if len(out) > 3 {
		out = out[:3]
	}
	return out
}
