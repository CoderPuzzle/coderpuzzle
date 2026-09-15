func countDistinct(n int64) int64 {
	// Count the zero-free integers in [1, n] directly from n's digits,
	// peeled off arithmetically. Every shorter length contributes a full
	// block of 9^k values; then a prefix matching n so far branches to any
	// smaller nonzero digit and completes freely. The walk stops at n's
	// first zero digit — nothing below can be zero-free once the prefix
	// carries one. int64 holds every intermediate: each block is below
	// 9^15 < 2^48 and the total stays below n <= 10^15.
	var digits [16]int64
	count := 0
	for m := n; m > 0; m /= 10 {
		digits[count] = m % 10
		count++
	}
	total := int64(0)
	pow9 := int64(1)
	for k := 1; k < count; k++ {
		pow9 *= 9
		total += pow9
	}
	tight := true
	for i := count - 1; i >= 0; i-- {
		if digits[i] > 1 {
			total += (digits[i] - 1) * pow9
		}
		if digits[i] == 0 {
			tight = false
			break
		}
		pow9 /= 9
	}
	if tight {
		total++
	}
	return total
}
