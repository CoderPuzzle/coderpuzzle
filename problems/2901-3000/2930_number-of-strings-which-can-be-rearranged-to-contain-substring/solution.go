func stringCount(n int) int {
	// Inclusion-exclusion over the three deficits (missing 'l', missing
	// 't', at most one 'e'): 26^n minus strings missing each requirement,
	// re-adding intersections. Each modular power stays below 10^9+7, so
	// the signed sum fits an int64 with room to spare.
	const mod = 1000000007
	pow := func(base, exp int64) int64 {
		result := int64(1)
		factor := base % mod
		for exp > 0 {
			if exp&1 == 1 {
				result = result * factor % mod
			}
			factor = factor * factor % mod
			exp >>= 1
		}
		return result
	}
	wide := int64(n) % mod
	total := pow(26, int64(n)) - 3*pow(25, int64(n)) - wide*pow(25, int64(n)-1) +
		3*pow(24, int64(n)) + 2*wide*pow(24, int64(n)-1) -
		pow(23, int64(n)) - wide*pow(23, int64(n)-1)
	return int((total%mod + mod) % mod)
}
