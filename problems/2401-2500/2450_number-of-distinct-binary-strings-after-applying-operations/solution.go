func countDistinctStrings(s string, k int) int {
	// Only the number of size-k windows matters: e = n - k + 1. Flipping
	// a window is an independent yes/no choice and each combination gives
	// a distinct string (hint 2), so the answer is 2^e mod 1e9+7.
	const MOD = 1000000007
	base, res := int64(2), int64(1)
	for e := len(s) - k + 1; e > 0; e >>= 1 {
		if e&1 == 1 {
			res = res * base % MOD
		}
		base = base * base % MOD
	}
	return int(res)
}
