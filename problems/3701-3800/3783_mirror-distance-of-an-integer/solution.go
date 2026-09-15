func mirrorDistance(n int) int {
	// Peel digits least-significant first to build the reversal; any
	// trailing zeros of n simply never materialize as leading zeros.
	// Both sides stay below 10^9 < 2^31, so int arithmetic is exact.
	original, reversed := n, 0
	for n > 0 {
		reversed = reversed*10 + n%10
		n /= 10
	}
	if d := original - reversed; d < 0 {
		return -d
	} else {
		return d
	}
}
