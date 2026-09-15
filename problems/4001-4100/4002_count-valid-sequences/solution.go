func countValidSequences(n int, k int) int {
	const MOD = 1000000007
	// Factorials and inverse factorials up to n; the single modular
	// inverse comes from Fermat's little theorem (p prime), no floats.
	fact := make([]int64, n+1)
	fact[0] = 1
	for i := 1; i <= n; i++ {
		fact[i] = fact[i-1] * int64(i) % MOD
	}
	invFact := make([]int64, n+1)
	invFact[n] = powmod(fact[n], MOD-2)
	for i := n; i >= 1; i-- {
		invFact[i-1] = invFact[i] * int64(i) % MOD
	}
	total := combMod(n-1, k-1, fact, invFact)
	// All-odd compositions exist iff n-k is even; substituting each part
	// x_i = 2*y_i + 1 leaves (n-k)/2 spread over k non-negative y_i.
	if (n-k)%2 == 0 {
		total -= combMod((n+k)/2-1, k-1, fact, invFact)
	}
	return int((total%MOD + MOD) % MOD)
}

func combMod(a int, b int, fact []int64, invFact []int64) int64 {
	const MOD = 1000000007
	if b < 0 || b > a {
		return 0
	}
	return fact[a] * invFact[b] % MOD * invFact[a-b] % MOD
}

func powmod(base int64, exp int64) int64 {
	const MOD = 1000000007
	r := int64(1)
	base %= MOD
	for exp > 0 {
		if exp&1 == 1 {
			r = r * base % MOD
		}
		base = base * base % MOD
		exp >>= 1
	}
	return r
}
