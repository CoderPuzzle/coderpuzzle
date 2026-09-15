func sumOfNumbers(l int, r int, k int) int64 {
	const MOD = 1_000_000_007
	m := int64(r - l + 1)
	digitSum := int64(l+r) * m / 2
	// A fixed position holds any one digit d of [l, r] in exactly
	// m^(k-1) of the m^k strings, so it contributes digitSum * m^(k-1) *
	// 10^p; the place weights sum to the repunit R(k) = (10^k - 1) / 9,
	// reduced through Fermat's inverse of 9.
	repunit := (powMod(10, int64(k), MOD) - 1) % MOD * powMod(9, MOD-2, MOD) % MOD
	return digitSum % MOD * powMod(m, int64(k-1), MOD) % MOD * repunit % MOD
}

// Binary exponentiation: reduced factors stay below 2^30, so every
// product fits int64 exactly (below 2^60).
func powMod(base, exp, mod int64) int64 {
	result := int64(1)
	b := base % mod
	for exp > 0 {
		if exp&1 == 1 {
			result = result * b % mod
		}
		b = b * b % mod
		exp >>= 1
	}
	return result
}
