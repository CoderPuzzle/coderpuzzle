// Count pairs of final pieces: every unordered pair of unit pieces is
// separated, and charged, exactly once somewhere in the split tree.
func minCost(n int) int {
	return n * (n - 1) / 2
}
