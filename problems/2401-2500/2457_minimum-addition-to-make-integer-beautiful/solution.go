func makeIntegerBeautiful(n int64, target int) int64 {
	// Round n up to the next multiple of 10, then 100, and so on,
	// until the digit sum drops to target or below. Zeroing a suffix
	// is the only move that lowers a digit sum, and the smallest
	// beautiful value >= n is always such a round-up, so the first
	// round that fits is the minimum addition. n <= 10^12 keeps every
	// intermediate inside int64.
	original := n
	base := int64(10)
	for digitSum(n) > target {
		n = (n/base + 1) * base
		base *= 10
	}
	return n - original
}

func digitSum(value int64) int {
	total := 0
	for value > 0 {
		total += int(value % 10)
		value /= 10
	}
	return total
}
