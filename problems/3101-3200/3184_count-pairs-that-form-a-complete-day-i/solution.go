func countCompleteDayPairs(hours []int) int {
	// With n <= 100 there are at most 4950 pairs, so hint 1's straight
	// double scan is exactly right at this scale. Each value already
	// reaches 1e9, so reducing to residues keeps every intermediate inside
	// a couple of dozen regardless of how wide int happens to be.
	residues := make([]int, len(hours))
	for i, value := range hours {
		residues[i] = value % 24
	}
	count := 0
	for i := 0; i < len(hours); i++ {
		for j := i + 1; j < len(hours); j++ {
			if (residues[i]+residues[j])%24 == 0 {
				count++
			}
		}
	}
	return count
}
