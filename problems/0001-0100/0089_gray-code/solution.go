func grayCode(n int) []int {
	size := 1 << uint(n)
	code := make([]int, 0, size)
	// The pinned order is its own recipe: element at index i is i ^ (i >> 1),
	// the standard reflected gray code. One loop, no post-processing.
	for i := 0; i < size; i++ {
		code = append(code, i^(i>>1))
	}
	return code
}
