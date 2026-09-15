// An operation retargets one character anywhere, so only letter counts
// matter. Condition 3 unifies both strings on one letter c: every
// character that is not already c pays once. Conditions 1 and 2 share a
// boundary after letter c — the lower string pays its letters above c,
// the higher one its letters at or below c — and one sweep with running
// below/above totals prices both orientations at once. The boundary
// stops after 'y': nothing can sit above 'z', so 'z' can never cap the
// lower string.
func minCharacters(a string, b string) int {
	var countsA, countsB [26]int
	for _, c := range a {
		countsA[c-'a']++
	}
	for _, c := range b {
		countsB[c-'a']++
	}
	n, m := len(a), len(b)
	best := n + m
	for i := 0; i < 26; i++ {
		best = min(best, n-countsA[i]+m-countsB[i])
	}
	aboveA, aboveB, belowA, belowB := n, m, 0, 0
	for i := 0; i < 25; i++ {
		aboveA -= countsA[i]
		aboveB -= countsB[i]
		belowA += countsA[i]
		belowB += countsB[i]
		best = min(best, aboveA+belowB, aboveB+belowA)
	}
	return best
}
