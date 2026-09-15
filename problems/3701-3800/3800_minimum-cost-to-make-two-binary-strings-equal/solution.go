func minimumCost(s string, t string, flipCost int, swapCost int, crossCost int) int64 {
	// Mismatch classes decide everything: a01 counts columns needing 0->1,
	// a10 the mirror image. Opposite kinds cancel pairwise with one swap
	// (or two flips); leftovers of a single kind pair up via cross-swap +
	// swap (or two flips); a lone leftover takes one flip.
	var a01 int64
	var a10 int64
	for i := 0; i < len(s); i++ {
		if s[i] == '0' && t[i] == '1' {
			a01++
		} else if s[i] == '1' && t[i] == '0' {
			a10++
		}
	}
	// Opposite-kind mismatches fix each other: reorder one string so they
	// meet, paying one swap; two flips is the alternative.
	pairs := min(a01, a10)
	cost := pairs * min(int64(swapCost), 2*int64(flipCost))
	same := a01 - a10
	if same < 0 {
		same = -same
	}
	// Same-kind mismatches: a cross-swap turns one into the other kind,
	// then a swap pairs it — or just flip both.
	cost += (same / 2) * min(int64(crossCost)+int64(swapCost), 2*int64(flipCost))
	if same%2 == 1 {
		cost += int64(flipCost)
	}
	return cost
}
