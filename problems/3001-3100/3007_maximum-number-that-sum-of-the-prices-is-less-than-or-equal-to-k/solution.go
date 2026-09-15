func findMaximumNumber(k int64, x int) int64 {
	// The accumulated price is nondecreasing in n, so the answer is the
	// largest n with priceSum(n) <= k. First double hi until it is expensive.
	lo, hi := int64(0), int64(10000000000000000)
	for priceSum3007(hi, x) <= k {
		hi *= 2
	}
	// Invariant: lo is cheap, hi is expensive; lo ends as the answer.
	for lo+1 < hi {
		mid := (lo + hi) / 2
		if priceSum3007(mid, x) <= k {
			lo = mid
		} else {
			hi = mid
		}
	}
	return lo
}

// priceSum3007 is the accumulated price of n: for each watched bit position
// p = x, 2x, ..., count how many numbers in [1, n] have bit p-1 set.
func priceSum3007(n int64, x int) int64 {
	var total int64
	p := x
	// Positions with 2^(p-1) > n contribute nothing, so stop there.
	for (int64(1) << uint(p-1)) <= n {
		b := uint(p - 1)
		// Bit b alternates in blocks of 2^b set / 2^b clear: count full
		// cycles plus the partial one over the first n+1 values.
		cycle := int64(1) << (b + 1)
		full := (n + 1) / cycle
		rem := (n + 1) % cycle
		half := int64(1) << b
		extra := rem - half
		if extra < 0 {
			extra = 0
		}
		total += full*half + extra
		p += x
	}
	return total
}
