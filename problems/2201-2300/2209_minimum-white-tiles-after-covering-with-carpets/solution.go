// dp[i][j] is the fewest white tiles still visible among floor[i:] when
// at most j carpets remain. Tile i is either left showing — and pays
// floor[i] on top of dp[i+1][j] — or a carpet is laid with its left end
// exactly at i, hiding i..i+carpetLen-1 and jumping the state to
// dp[min(i+carpetLen, n)][j-1]. Filling i downward and j upward leaves
// every reference already computed, and the j = 0 row is just the suffix
// white counts. dp[0][numCarpets] answers for the whole floor;
// overlapping or wasted carpets cost nothing because the recurrence
// takes a minimum, never a sum, over placements.
func minimumWhiteTiles(floor string, numCarpets int, carpetLen int) int {
	n := len(floor)
	dp := make([][]int, n+1)
	for i := range dp {
		dp[i] = make([]int, numCarpets+1)
	}
	for i := n - 1; i >= 0; i-- {
		white := int(floor[i] - '0')
		dp[i][0] = dp[i+1][0] + white
		covered := min(i+carpetLen, n)
		for j := 1; j <= numCarpets; j++ {
			dp[i][j] = min(dp[i+1][j]+white, dp[covered][j-1])
		}
	}
	return dp[0][numCarpets]
}
