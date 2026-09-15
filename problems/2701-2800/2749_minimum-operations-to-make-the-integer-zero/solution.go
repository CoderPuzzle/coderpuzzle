import "math/bits"

func makeTheIntegerZero(num1 int, num2 int) int {
	// After k operations num1 became num1 - k*num2 - (sum of k powers of
	// two), so reaching 0 means m = num1 - k*num2 is a sum of exactly k
	// powers of two. That holds iff popcount(m) <= k <= m.
	for k := int64(1); k <= 60; k++ {
		// m peaks near 6.1e10, past int32 range: compute in int64.
		m := int64(num1) - k*int64(num2)
		if m >= k && bits.OnesCount64(uint64(m)) <= int(k) {
			// Scanning upward makes the first hit the minimum.
			return int(k)
		}
	}
	return -1
}
