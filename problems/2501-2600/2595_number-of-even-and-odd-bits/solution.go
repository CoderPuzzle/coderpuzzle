func evenOddBit(n int) []int {
	// Peel the binary representation one bit at a time from the right;
	// the peel counter doubles as the bit index, whose parity routes each
	// set bit into the even or the odd bucket.
	counts := make([]int, 2)
	pos := 0
	for v := n; v > 0; v >>= 1 {
		if v&1 == 1 {
			counts[pos%2]++
		}
		pos++
	}
	return counts
}
