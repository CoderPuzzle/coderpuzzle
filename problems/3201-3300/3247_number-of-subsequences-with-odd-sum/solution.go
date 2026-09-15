func subsequenceCount(nums []int) int {
	// Carry the count of even-sum and odd-sum subsequences of the
	// scanned prefix; an even element doubles both counts, an odd one
	// makes both counts their sum. Values stay below 2 * (10^9 + 6),
	// which fits in an int.
	const mod = 1000000007
	even, odd := 1, 0
	for _, num := range nums {
		if num%2 != 0 {
			merged := (even + odd) % mod
			even, odd = merged, merged
		} else {
			even, odd = even*2%mod, odd*2%mod
		}
	}
	return odd
}
