import "sort"

func maxEnvelopes(envelopes [][]int) int {
	// Width ascending, height descending on ties: a chain needs strictly
	// increasing widths, so at most one envelope per width fits, and the
	// descending tie-break keeps equal widths from chaining among
	// themselves — the task reduces to LIS on heights.
	sort.Slice(envelopes, func(a, b int) bool {
		if envelopes[a][0] != envelopes[b][0] {
			return envelopes[a][0] < envelopes[b][0]
		}
		return envelopes[a][1] > envelopes[b][1]
	})
	// Patience sorting: tails[i] = min height ending a chain of length i+1.
	tails := []int{}
	for _, e := range envelopes {
		x := e[1]
		// SearchInts is a lower bound: STRICT increase (rejects equal
		// heights); extend the longest chain or replace the first >= tail
		// — safe, it only helps future extensions.
		i := sort.SearchInts(tails, x)
		if i == len(tails) {
			tails = append(tails, x)
		} else {
			tails[i] = x
		}
	}
	return len(tails)
}
