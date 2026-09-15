// Rolling counts for the prefix built so far: same = its last two posts
// share a color, diff = they differ. Seeded at the first post: nothing
// precedes it to match, so all k colors start as "differs".
func numWays(n int, k int) int {
	same, diff := 0, k
	for i := 1; i < n; i++ {
		// A same-color post must follow a differing pair, and a differing
		// post picks any of the k - 1 remaining colors after anything.
		same, diff = diff, (same+diff)*(k-1)
	}
	return same + diff
}
