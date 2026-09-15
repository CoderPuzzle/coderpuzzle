func circularPermutation(n int, start int) []int {
	// Reflected gray code g(i) = i ^ (i >> 1); XOR-ing every entry by start
	// preserves the one-bit-step property and lands p[0] = start.
	size := 1 << n
	out := make([]int, size)
	for i := 0; i < size; i++ {
		out[i] = start ^ (i ^ (i >> 1))
	}
	return out
}
