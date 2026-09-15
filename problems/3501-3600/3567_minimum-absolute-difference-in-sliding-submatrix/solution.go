import "sort"

// Sorting a window's k*k values places the closest pair of distinct values
// next to each other, so the smallest adjacent gap in the sorted order is
// the minimum |a - b|; duplicate values contribute a zero gap, and a
// k == 1 window has no pair, hence the 0 default.
func minAbsDiff(grid [][]int, k int) [][]int {
	m, n := len(grid), len(grid[0])
	answer := make([][]int, m-k+1)
	for i := range answer {
		answer[i] = make([]int, n-k+1)
	}
	window := make([]int, k*k)
	for i := 0; i+k <= m; i++ {
		for j := 0; j+k <= n; j++ {
			size := 0
			for r := i; r < i+k; r++ {
				for c := j; c < j+k; c++ {
					window[size] = grid[r][c]
					size++
				}
			}
			sort.Ints(window)
			best := 0
			if k > 1 {
				best = window[1] - window[0]
				for t := 2; t < k*k; t++ {
					if window[t]-window[t-1] < best {
						best = window[t] - window[t-1]
					}
				}
			}
			answer[i][j] = best
		}
	}
	return answer
}
