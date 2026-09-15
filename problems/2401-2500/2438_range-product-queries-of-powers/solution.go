func productQueries(n int, queries [][]int) []int {
	// The minimum set of powers of two summing to n is exactly its set
	// bits (hint 1), so powers is the sorted list of 1 << b for each set
	// bit b. A range product of ascending powers of two is itself a power
	// of two — 2^(exponent sum) — but under the modulus the clean tool is
	// prefix products with one modular inverse per query (Fermat, MOD
	// prime): product(lo..hi) = pref[hi+1] * inv(pref[lo]).
	const mod = 1_000_000_007
	var powers []int64
	for b := 0; b < 30; b++ {
		if n>>b&1 == 1 {
			powers = append(powers, 1<<b)
		}
	}
	pref := make([]int64, len(powers)+1)
	pref[0] = 1
	for i, v := range powers {
		pref[i+1] = pref[i] * v % mod
	}
	answers := make([]int, len(queries))
	for q, query := range queries {
		lo, hi := query[0], query[1]
		answers[q] = int(pref[hi+1] * powMod(pref[lo], mod-2, mod) % mod)
	}
	return answers
}

func powMod(base, exp, mod int64) int64 {
	result := int64(1)
	for exp > 0 {
		if exp&1 == 1 {
			result = result * base % mod
		}
		base = base * base % mod
		exp >>= 1
	}
	return result
}
