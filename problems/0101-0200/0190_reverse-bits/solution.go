// Bit-by-bit: each iteration pushes n's lowest bit onto the accumulator,
// which has just been shifted left, so bit i of n ends at position 31 - i.
func reverseBits(n int) int {
	// uint32 keeps the shifts logical on the 32-bit pattern.
	remaining := uint32(n)
	reversed := uint32(0)
	for i := 0; i < 32; i++ {
		reversed = reversed<<1 | remaining&1
		remaining >>= 1
	}
	return int(reversed)
}
