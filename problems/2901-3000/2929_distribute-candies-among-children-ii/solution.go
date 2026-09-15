func distributeCandies(n int, limit int) int64 {
	// Inclusion-exclusion over the three per-child caps: without caps the
	// splits of n among 3 children number C(n + 2, 2); forcing a child
	// over its cap is counted by C(n - (limit+1) + 2, 2), and the
	// alternating sum repairs double- and triple-forced overlaps. Terms
	// reach 1.5 * 10^12, so int64 carries them.
	cappedWays := func(candies int64) int64 {
		if candies >= 2 {
			return candies * (candies - 1) / 2
		}
		return 0
	}
	return cappedWays(int64(n+2)) - 3*cappedWays(int64(n-(limit+1)+2)) +
		3*cappedWays(int64(n-2*(limit+1)+2)) -
		cappedWays(int64(n-3*(limit+1)+2))
}
