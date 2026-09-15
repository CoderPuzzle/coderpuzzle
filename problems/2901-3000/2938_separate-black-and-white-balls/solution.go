// Swaps only happen between adjacent balls, and two balls of the same
// color never need to cross, so the minimum number of swaps is exactly
// the number of (1, 0) inversions: each 1 must pass every 0 sitting to
// its right. One right-to-left sweep counts them — accumulate the zeros
// seen so far and add that to the answer at every 1. The count can
// exceed 32 bits (a half split of 10^5 balls gives 2.5 x 10^9), hence
// the 64-bit accumulator.
func minimumSteps(s string) int64 {
	var total int64
	var zeros int64
	for i := len(s) - 1; i >= 0; i-- {
		if s[i] == '0' {
			zeros++
		} else {
			total += zeros
		}
	}
	return total
}
