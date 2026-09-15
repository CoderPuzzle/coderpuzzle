func minCostToMoveChips(position []int) int {
	// A +-2 move is free, so only parity matters; a +-1 move flips it at
	// cost 1. Pay for whichever side has fewer chips.
	odd := 0
	for _, p := range position {
		odd += p % 2
	}
	even := len(position) - odd
	if odd < even {
		return odd
	}
	return even
}
