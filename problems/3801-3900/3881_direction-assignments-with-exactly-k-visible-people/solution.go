func countVisiblePeople(n int, pos int, k int) int {
	// The number seen is (# left people choosing 'L') + (# right people
	// choosing 'R'), so Vandermonde's identity collapses the split sum to
	// 2 * C(n - 1, k). Modular products fit int64, the answer is an int.
	const MOD int64 = 1000000007
	if k > n-1 {
		return 0
	}
	size := n - 1
	fact := make([]int64, size+1)
	invFact := make([]int64, size+1)
	fact[0] = 1
	for i := 1; i <= size; i++ {
		fact[i] = fact[i-1] * int64(i) % MOD
	}
	invFact[size] = modPow(fact[size], MOD-2, MOD)
	for i := size; i > 0; i-- {
		invFact[i-1] = invFact[i] * int64(i) % MOD
	}
	comb := fact[n-1] * invFact[k] % MOD * invFact[n-1-k] % MOD
	return int(2 * comb % MOD)
}

// Fermat inverse via binary exponentiation, all products inside int64.
func modPow(base, exp, mod int64) int64 {
	result := int64(1)
	base %= mod
	for exp > 0 {
		if exp&1 == 1 {
			result = result * base % mod
		}
		base = base * base % mod
		exp >>= 1
	}
	return result
}
