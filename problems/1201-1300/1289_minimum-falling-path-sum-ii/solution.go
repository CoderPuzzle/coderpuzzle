func minFallingPathSum(grid [][]int) int {
	n := len(grid)
	prev := make([]int, n)
	copy(prev, grid[0])
	cur := make([]int, n)
	for i := 1; i < n; i++ {
		min1, min2, idx1 := int(^uint(0)>>1), int(^uint(0)>>1), -1
		for j := 0; j < n; j++ {
			v := prev[j]
			if v < min1 {
				min2 = min1
				min1 = v
				idx1 = j
			} else if v < min2 {
				min2 = v
			}
		}
		for j := 0; j < n; j++ {
			best := min1
			if j == idx1 {
				best = min2
			}
			cur[j] = grid[i][j] + best
		}
		prev, cur = cur, prev
	}
	result := prev[0]
	for _, v := range prev {
		if v < result {
			result = v
		}
	}
	return result
}
