func maxSizeSlices(slices []int) int {
	k := len(slices) / 3

	// dp[i][j] = best value using the first i entries, picking exactly j,
	// with no two chosen adjacent.
	rob := func(arr []int, picks int) int {
		length := len(arr)
		dp := make([][]int, length+1)
		for i := range dp {
			dp[i] = make([]int, picks+1)
			for j := range dp[i] {
				dp[i][j] = -1
			}
		}
		dp[0][0] = 0
		for i := 1; i <= length; i++ {
			for j := 0; j <= picks; j++ {
				dp[i][j] = dp[i-1][j]
				if j >= 1 {
					var base int
					if i >= 2 {
						base = dp[i-2][j-1]
					} else if j == 1 {
						base = 0
					} else {
						base = -1
					}
					if base >= 0 && base+arr[i-1] > dp[i][j] {
						dp[i][j] = base + arr[i-1]
					}
				}
			}
		}
		return dp[length][picks]
	}

	if len(slices) == 1 {
		return slices[0]
	}
	withoutLast := slices[:len(slices)-1]
	withoutFirst := slices[1:]
	a, b := rob(withoutLast, k), rob(withoutFirst, k)
	if a > b {
		return a
	}
	return b
}
