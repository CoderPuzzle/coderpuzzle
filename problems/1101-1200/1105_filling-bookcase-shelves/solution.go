func minHeightShelves(books [][]int, shelfWidth int) int {
	// Order is fixed and each shelf holds a contiguous run, so the only
	// freedom is where boundaries fall: dp[i] = best height for the first
	// i books, with dp[0] = 0 as the empty base.
	count := len(books)
	dp := make([]int, count+1)
	for i := 1; i <= count; i++ {
		// Grow the last shelf of the prefix backwards from book i-1,
		// accumulating width and the run's max height.
		width := 0
		height := 0
		dp[i] = 1 << 40
		for j := i - 1; j >= 0; j-- {
			thickness, bookHeight := books[j][0], books[j][1]
			width += thickness
			// Earlier books only widen the run further: stop here.
			if width > shelfWidth {
				break
			}
			if bookHeight > height {
				height = bookHeight
			}
			// Books j..i-1 form the last shelf at cost dp[j] + height.
			if dp[j]+height < dp[i] {
				dp[i] = dp[j] + height
			}
		}
	}
	return dp[count]
}
