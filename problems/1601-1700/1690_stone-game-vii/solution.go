// Each move removes one of the two ends, so a position is fully the run
// stones[l..r] still on the table. Both players optimize the same number
// from their own side: dp[l][r] is the best margin, mover's score minus
// opponent's, on that run — taking the left stone banks sum(l+1..r) and
// hands the rest over, whose best margin there becomes the taker's deficit;
// the right stone mirrors it. Fill l descending / r ascending so both
// shorter runs are ready.
func stoneGameVII(stones []int) int {
	n := len(stones)
	pre := make([]int64, n+1)
	for i, v := range stones {
		pre[i+1] = pre[i] + int64(v)
	}
	dp := make([][]int32, n)
	for i := range dp {
		dp[i] = make([]int32, n)
	}
	for l := n - 2; l >= 0; l-- {
		row := dp[l]
		below := dp[l+1]
		pl, pl1 := pre[l], pre[l+1]
		for r := l + 1; r < n; r++ {
			a := pre[r+1] - pl1 - int64(below[r])
			b := pre[r] - pl - int64(row[r-1])
			if b > a {
				a = b
			}
			row[r] = int32(a)
		}
	}
	return int(dp[0][n-1])
}
