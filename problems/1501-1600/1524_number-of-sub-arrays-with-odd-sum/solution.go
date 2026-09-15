func numOfSubarrays(arr []int) int {
	// `even`/`odd` count prefixes seen so far (including the empty prefix
	// before the array) with even/odd parity; a new odd-parity prefix pairs
	// with every earlier even prefix to make an odd-sum subarray, and
	// symmetrically for a new even-parity prefix. `total` is int64 so the
	// running sum never overflows before the mod is applied.
	const mod = 1_000_000_007
	var even, odd int64 = 1, 0
	parity := 0
	var total int64
	for _, x := range arr {
		parity ^= x & 1
		if parity == 1 {
			total = (total + even) % mod
			odd++
		} else {
			total = (total + odd) % mod
			even++
		}
	}
	return int(total)
}
