func waysToFillArray(queries [][]int) []int {
	const MOD = 1000000007
	const MAX = 20000

	fact := make([]int64, MAX+1)
	fact[0] = 1
	for i := 1; i <= MAX; i++ {
		fact[i] = fact[i-1] * int64(i) % MOD
	}
	modPow := func(base, exp int64) int64 {
		result := int64(1)
		b := base % MOD
		for exp > 0 {
			if exp&1 == 1 {
				result = result * b % MOD
			}
			b = b * b % MOD
			exp >>= 1
		}
		return result
	}
	invFact := make([]int64, MAX+1)
	// One Fermat inversion at the top; running it backwards yields every
	// smaller inverse factorial with a single multiplication each.
	invFact[MAX] = modPow(fact[MAX], MOD-2)
	for i := MAX; i > 0; i-- {
		invFact[i-1] = invFact[i] * int64(i) % MOD
	}

	comb := func(n, r int) int64 {
		if r < 0 || r > n {
			return 0
		}
		return fact[n] * invFact[r] % MOD * invFact[n-r] % MOD
	}

	answers := make([]int, 0, len(queries))
	for _, query := range queries {
		n, k := query[0], query[1]
		ways := int64(1)
		// Trial division up to sqrt(k) collects each prime's exponent.
		d := 2
		for d*d <= k {
			if k%d == 0 {
				exponent := 0
				for k%d == 0 {
					k /= d
					exponent++
				}
				// Primes never interact, so the per-prime counts multiply:
				// spreading x copies of one prime over n slots is stars
				// and bars, C(x + n - 1, n - 1).
				ways = ways * comb(exponent+n-1, n-1) % MOD
			}
			d++
		}
		// A leftover greater than 1 is a prime of exponent 1.
		if k > 1 {
			ways = ways * comb(1+n-1, n-1) % MOD
		}
		answers = append(answers, int(ways))
	}
	return answers
}
