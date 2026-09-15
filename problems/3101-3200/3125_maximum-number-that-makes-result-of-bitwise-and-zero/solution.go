func maxNumber(n int64) int64 {
	// Numbers above 2^m - 1 sit inside [2^m, n], so every value in such a
	// range keeps bit m set and the AND can never fall to zero. x =
	// 2^m - 1 wins because its range contains both itself and 2^m, which
	// AND to zero together. With n <= 10^15 the int64 power of two never
	// overflows.
	power := int64(1)
	for power*2 <= n {
		power *= 2
	}
	return power - 1
}
