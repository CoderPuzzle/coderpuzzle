import "sort"

func maxScore(grid [][]int) int {
	n := len(grid)
	// value -> bitmask of rows containing that value
	valueRows := make(map[int]int)
	for r := 0; r < n; r++ {
		for _, c := range grid[r] {
			valueRows[c] |= 1 << r
		}
	}
	values := make([]int, 0, len(valueRows))
	for v := range valueRows {
		values = append(values, v)
	}
	sort.Sort(sort.Reverse(sort.IntSlice(values)))
	full := 1 << n
	dp := make([]int, full)
	ndp := make([]int, full)
	for i := range dp {
		dp[i] = -1
	}
	dp[0] = 0
	for _, value := range values {
		rows := valueRows[value]
		copy(ndp, dp)
		for mask := 0; mask < full; mask++ {
			cur := dp[mask]
			if cur < 0 {
				continue
			}
			rem := rows &^ mask
			for rem != 0 {
				bit := rem & -rem
				nmask := mask | bit
				cand := cur + value
				if cand > ndp[nmask] {
					ndp[nmask] = cand
				}
				rem &= rem - 1
			}
		}
		dp, ndp = ndp, dp
	}
	ans := 0
	for _, v := range dp {
		if v > ans {
			ans = v
		}
	}
	return ans
}
