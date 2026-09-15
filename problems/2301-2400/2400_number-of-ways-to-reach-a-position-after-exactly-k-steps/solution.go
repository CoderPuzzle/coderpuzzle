func numberOfWays(startPos int, endPos int, k int) int {
	// Only the distance matters. With r right and l left steps,
	// r - l = d and r + l = k force d <= k, (k - d) even, and
	// right = (k + d) / 2; any ordering of the steps is a distinct
	// way, so the count is C(k, right) mod 1e9+7.
	const MOD = 1_000_000_007
	d := endPos - startPos
	if d < 0 {
		d = -d
	}
	if d > k || (k-d)%2 != 0 {
		return 0
	}
	right := (k + d) / 2

	fact := make([]int64, k+1)
	fact[0] = 1
	for i := int64(1); i <= int64(k); i++ {
		fact[i] = fact[i-1] * i % MOD
	}
	power := func(base, exp int64) int64 {
		result := int64(1)
		for exp > 0 {
			if exp&1 == 1 {
				result = result * base % MOD
			}
			base = base * base % MOD
			exp >>= 1
		}
		return result
	}
	invFact := make([]int64, k+1)
	invFact[k] = power(fact[k], MOD-2)
	for i := int64(k); i >= 1; i-- {
		invFact[i-1] = invFact[i] * i % MOD
	}
	return int(fact[int64(k)] * invFact[int64(right)] % MOD * invFact[int64(k-right)] % MOD)
}
