func countGoodArrays(n int, m int, k int) int {
	const MOD = 1000000007
	// answer = m * C(n-1, k) * (m-1)^(n-1-k)  (mod 1e9+7)
	fact := make([]int64, n+1)
	fact[0] = 1
	for i := 1; i <= n; i++ {
		fact[i] = fact[i-1] * int64(i) % MOD
	}
	invFact := make([]int64, n+1)
	invFact[n] = powMod(fact[n], MOD-2, MOD)
	for i := n; i >= 1; i-- {
		invFact[i-1] = invFact[i] * int64(i) % MOD
	}

	var comb int64
	if k >= 0 && k <= n-1 {
		comb = fact[n-1] * invFact[k] % MOD * invFact[n-1-k] % MOD
	}

	return int(int64(m) % MOD * comb % MOD * powMod(int64(m-1), int64(n-1-k), MOD) % MOD)
}

func powMod(base, exp, mod int64) int64 {
	result := int64(1)
	b := ((base % mod) + mod) % mod
	e := exp
	for e > 0 {
		if e&1 == 1 {
			result = result * b % mod
		}
		b = b * b % mod
		e >>= 1
	}
	return result
}
