func sumOfBlocks(n int) int {
	// Build the blocks in order from one shared counter: block i multiplies
	// the next i consecutive integers into a product that is reduced modulo
	// 10^9 + 7 after every factor, then folds it into the running total.
	// F(n) combines the blocks using only multiplication and addition, so
	// residue arithmetic reproduces F(n) mod 10^9 + 7 exactly while the
	// exact products are never materialized.
	const mod = 1_000_000_007
	var total, cur int64 = 0, 1
	for i := 1; i <= n; i++ {
		var prod int64 = 1
		for j := 0; j < i; j++ {
			prod = prod * cur % mod
			cur++
		}
		total = (total + prod) % mod
	}
	return int(total)
}
