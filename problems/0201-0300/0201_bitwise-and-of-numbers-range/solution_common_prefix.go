func rangeBitwiseAnd(left int, right int) int {
	shift := 0
	// Shift both endpoints right until they agree: what remains is the
	// common binary prefix. Every bit below it flips through 0 somewhere in
	// [left, right], so the range's AND keeps only the prefix.
	for left < right {
		left >>= 1
		right >>= 1
		shift++
	}
	// Restore the prefix to its original position, zeros below.
	return left << shift
}
