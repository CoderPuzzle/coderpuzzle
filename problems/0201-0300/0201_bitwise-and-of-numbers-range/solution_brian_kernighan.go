func rangeBitwiseAnd(left int, right int) int {
	// Clear the lowest set bit of right while it still exceeds left: every
	// cleared bit is one that flips somewhere in [left, right], so it
	// cannot survive the range's AND.
	for right > left {
		right &= right - 1
	}
	// Only the common prefix of the endpoints remains — the AND itself.
	return right
}
