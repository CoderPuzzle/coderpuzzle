// Binary search for the largest m with m * m <= x: the predicate is
// monotone (past the root, every square overshoots), so halving the
// candidate interval lands exactly on the rounded-down square root.
func mySqrt(x int) int {
	// 64-bit bounds and midpoint: near x = 2^31 - 1 the probes climb
	// toward x itself, and mid * mid reaches ~2^62, far past 32 bits.
	low, high := int64(0), int64(x)
	for low < high {
		// Round the midpoint up: with a plain floor the interval can stop
		// shrinking when low == mid, and the loop would never terminate.
		mid := low + (high-low+1)/2
		if mid*mid <= int64(x) {
			low = mid
		} else {
			high = mid - 1
		}
	}
	return int(low)
}
