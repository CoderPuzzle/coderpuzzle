func preimageSizeFZF(k int) int {
	zeta := func(x int64) int64 {
		// Trailing zeroes of x! come from factors of 5 (2s are
		// plentiful): each multiple of p = 5, 25, 125, ... adds one.
		count := int64(0)
		p := int64(5)
		for p <= x {
			count += x / p
			p *= 5
		}
		return count
	}

	// zeta is nondecreasing, so bisect for the smallest x with
	// zeta(x) >= k; zeta(5*(k+1)) >= k+1 makes this bound safe.
	lo := int64(0)
	hi := int64(5)*int64(k+1) + 10
	for lo < hi {
		mid := lo + (hi-lo)/2
		if zeta(mid) < int64(k) {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	// Each block 5m..5m+4 shares one zeta value, so an achieved k
	// has exactly five preimages; a k skipped at a multiple of 25
	// has none.
	if zeta(lo) == int64(k) {
		return 5
	}
	return 0
}
