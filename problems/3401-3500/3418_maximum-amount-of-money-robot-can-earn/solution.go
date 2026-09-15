func maximumAmount(coins [][]int) int {
	// dp0/dp1/dp2[j]: best total reaching the current cell having used at
	// most 0/1/2 of the neutralizations. Rows update in place (the left
	// neighbor is already fresh), so the cell above is snapshotted first.
	const neg = -1 << 30
	rows, cols := len(coins), len(coins[0])
	dp0 := make([]int, cols)
	dp1 := make([]int, cols)
	dp2 := make([]int, cols)
	for j := range dp0 {
		dp0[j], dp1[j], dp2[j] = neg, neg, neg
	}
	for i := 0; i < rows; i++ {
		for j := 0; j < cols; j++ {
			value := coins[i][j]
			if i == 0 && j == 0 {
				dp0[0] = value
				dp1[0] = max(value, 0)
				dp2[0] = dp1[0]
				continue
			}
			up0, up1, up2 := dp0[j], dp1[j], dp2[j]
			left0, left1, left2 := neg, neg, neg
			if j > 0 {
				left0, left1, left2 = dp0[j-1], dp1[j-1], dp2[j-1]
			}
			best0, best1, best2 := max(up0, left0), max(up1, left1), max(up2, left2)
			dp0[j] = best0 + value
			// A neutralization (worth it only on a robber) adds 0 here
			// and enters from a neighbor's k-1 layer.
			if value < 0 {
				dp1[j] = max(best1+value, best0)
				dp2[j] = max(best2+value, best1)
			} else {
				dp1[j] = best1 + value
				dp2[j] = best2 + value
			}
		}
	}
	return max(dp0[cols-1], max(dp1[cols-1], dp2[cols-1]))
}
