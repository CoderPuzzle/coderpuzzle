func countSubstrings(s string, t string) int {
	// same[j] = length of the exact-match run ending at s[i-1], t[j-1].
	// diff[j] = length of the run ending there with exactly one mismatch,
	// counted directly: the mismatch count along a fixed pair of starts is
	// monotone non-decreasing, so this length is exact.
	n, m := len(s), len(t)
	samePrev := make([]int, m+1)
	diffPrev := make([]int, m+1)
	total := 0
	for i := 1; i <= n; i++ {
		sameCurr := make([]int, m+1)
		diffCurr := make([]int, m+1)
		for j := 1; j <= m; j++ {
			if s[i-1] == t[j-1] {
				// A matching pair of last characters carries the diagonal
				// counts forward unchanged.
				sameCurr[j] = samePrev[j-1] + 1
				diffCurr[j] = diffPrev[j-1]
			} else {
				// This position is the single mismatch, so it can only
				// extend back through a run that matched perfectly.
				sameCurr[j] = 0
				diffCurr[j] = samePrev[j-1] + 1
			}
			total += diffCurr[j]
		}
		samePrev, diffPrev = sameCurr, diffCurr
	}
	return total
}
