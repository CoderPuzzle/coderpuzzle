// Going either way around the ring, a match at distance d (forward) is
// also n - d backward, so each matching index yields min(d, n-d); take the
// smallest over all matches.
func closestTarget(words []string, target string, startIndex int) int {
	n := len(words)
	best := -1
	for i, word := range words {
		if word != target {
			continue
		}
		gap := i - startIndex
		if gap < 0 {
			gap = -gap
		}
		d := n - gap
		if gap < d {
			d = gap
		}
		if best == -1 || d < best {
			best = d
		}
	}
	return best
}
