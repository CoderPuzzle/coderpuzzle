// Kernighan's loop: n & (n - 1) clears the lowest set bit each turn —
// subtracting one borrows through the trailing zeros and flips that bit off —
// so the count rises once per set bit, at most 32 turns on a 32-bit pattern.
// int64 keeps every pattern up to 2^32 - 1 in range as a positive value.
func hammingWeight(n int64) int {
	count := 0
	for n != 0 {
		n &= n - 1
		count++
	}
	return count
}
