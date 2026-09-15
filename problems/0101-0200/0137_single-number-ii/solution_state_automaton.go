func singleNumber(nums []int) int {
	// Two accumulators implement a mod-3 counter on every bit at once: a
	// bit is "in ones" after being seen 1 (mod 3) times and "in twos" after
	// 2 (mod 3); triples cycle a bit 00 -> ones -> twos -> 00.
	ones, twos := 0, 0
	for _, value := range nums {
		// XOR toggles the bit's state, and the & ^mask guard keeps a bit
		// already in the other register from entering this one.
		ones = (ones ^ value) &^ twos
		twos = (twos ^ value) &^ ones
	}
	// The unique value's bits were seen once, so they rest in ones.
	return ones
}
