func numberOfUniqueGoodSubsequences(binary string) int {
	const MOD = 1000000007
	// end0/end1 = distinct good subsequence VALUES ending in '0'/'1' over
	// the prefix. The lone "0" is the only good value with a leading zero,
	// so it lives in a flag and end0 holds only values starting with '1'.
	end0 := 0
	end1 := 0
	hasZero := false
	for i := 0; i < len(binary); i++ {
		// Extending every existing value by ch absorbs the old ending-in-ch
		// set (each was itself an extension of something shorter), so the
		// new count is simply end0 + end1.
		if binary[i] == '0' {
			// No lone "0" and never extend "0" itself: both would be
			// leading-zero values. Appending '0' to a 1-initial value is
			// always safe.
			end0 = (end0 + end1) % MOD
			hasZero = true
		} else {
			end1 = (end1 + end0 + 1) % MOD // +1: the character alone
		}
	}
	// Add back the lone "0" if any zero appeared.
	ans := (end0 + end1) % MOD
	if hasZero {
		ans = (ans + 1) % MOD
	}
	return ans
}
