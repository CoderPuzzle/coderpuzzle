func findKthNumber(m int, n int, k int) int {
	// The table is too big to build; its values are orderly enough to count.
	// Row i holds multiples i, 2i, ..., ni — min(x/i, n) of them are <= x.
	countAtMost := func(x int) bool {
		total := 0
		for i := 1; i <= m; i++ {
			total += min(x/i, n)
			// Early exit once the count already reaches k.
			if total >= k {
				return true
			}
		}
		return total >= k
	}
	// Smallest x whose count reaches k; it must be an actual table entry,
	// otherwise x-1 would satisfy the predicate too.
	lo, hi := 1, m*n
	for lo < hi {
		mid := lo + (hi-lo)/2
		if countAtMost(mid) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}
