func predictTheWinner(nums []int) bool {
	n := len(nums)
	// dp[i] = best (mover's score - opponent's score) on the window ending
	// at j; the copy of nums is the length-1 base case.
	dp := make([]int, n)
	copy(dp, nums)
	for length := 2; length <= n; length++ {
		for i := 0; i+length-1 < n; i++ {
			j := i + length - 1
			// Take an end, bank it, and absorb the opponent's optimal
			// reply as a subtracted sub-difference. In place, dp[i] is
			// still window (i, j-1) and dp[i+1] is (i+1, j) — the two
			// shorter intervals the recurrence needs.
			takeLeft := nums[i] - dp[i+1]
			takeRight := nums[j] - dp[i]
			if takeLeft > takeRight {
				dp[i] = takeLeft
			} else {
				dp[i] = takeRight
			}
		}
	}
	// Player 1 moves first on the whole array; ties count as a win.
	return dp[0] >= 0
}
