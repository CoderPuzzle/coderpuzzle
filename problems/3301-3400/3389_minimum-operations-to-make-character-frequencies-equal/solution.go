// Only the letter counts matter; a good string has every count at 0 or
// at some common target c, and c never needs to exceed the largest
// count. For a fixed c each letter either keeps c copies (cost |occ-c|)
// or is deleted out (cost occ). One refinement: a unit in the letter
// just left of a kept letter that still needs copies can change into it
// instead — the hop replaces the delete the unit would pay anyway and
// saves an insert, worth 1 per unit, up to how many spare units the
// left letter has and how many copies the right letter still needs.
// Those flows only run between adjacent letters, so one pass over the
// alphabet carrying the previous letter's choice (kept or emptied)
// prices each target; the answer is the cheapest target.
func makeStringGood(s string) int {
	occ := make([]int, 26)
	for _, ch := range s {
		occ[ch-'a']++
	}
	maxOcc := 0
	for _, count := range occ {
		if count > maxOcc {
			maxOcc = count
		}
	}
	best := len(s) // target c = 0: delete everything
	for target := 1; target <= maxOcc; target++ {
		keep := abs(occ[0] - target)
		zero := occ[0]
		for i := 1; i < 26; i++ {
			need := max(0, target-occ[i])
			saveKept := min(max(0, occ[i-1]-target), need)
			saveZero := min(occ[i-1], need)
			cost := abs(occ[i] - target)
			nextKeep := min(keep+cost-saveKept, zero+cost-saveZero)
			nextZero := min(keep, zero) + occ[i]
			keep = nextKeep
			zero = nextZero
		}
		best = min(best, min(keep, zero))
	}
	return best
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
