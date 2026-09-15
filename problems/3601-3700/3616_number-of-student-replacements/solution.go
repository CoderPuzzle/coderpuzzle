// One sweep: best is the smallest rank seen so far. A strictly better
// (lower) arrival displaces it and counts as a replacement; equal or
// worse ranks leave the selection untouched.
func totalReplacements(ranks []int) int {
	best, replacements := ranks[0], 0
	for _, rank := range ranks[1:] {
		if rank < best {
			best = rank
			replacements++
		}
	}
	return replacements
}
