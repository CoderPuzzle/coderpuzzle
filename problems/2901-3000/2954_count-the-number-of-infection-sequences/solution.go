func numberOfSequence(n int, sick []int) int {
	// The initially infected people split the line into blocks of
	// uninfected people. An edge block (touching index 0 or n - 1) has
	// only one infectable person per step, so its internal order is
	// forced; an interior block (sick people on both sides) may shed from
	// either endpoint, giving 2^(len - 1) internal orders. Blocks shed
	// independently, so the answer is the multinomial count of ways to
	// interleave the per-step picks across blocks, S! / prod len_i!, times
	// each interior block's 2^(len - 1), all mod 10^9 + 7. n <= 10^5 keeps
	// the factorial tables small; every residue product stays below
	// ~10^18, inside int64.
	const mod = 1000000007
	fact := make([]int64, n+1)
	invFact := make([]int64, n+1)
	pow2 := make([]int64, n+1)
	fact[0] = 1
	pow2[0] = 1
	for i := int64(1); i <= int64(n); i++ {
		fact[i] = fact[i-1] * i % mod
		pow2[i] = pow2[i-1] * 2 % mod
	}
	invFact[n] = 1
	base, result, expo := fact[n], int64(1), int64(mod-2)
	for expo > 0 {
		if expo&1 == 1 {
			result = result * base % mod
		}
		base = base * base % mod
		expo >>= 1
	}
	invFact[n] = result
	for i := n; i > 0; i-- {
		invFact[i-1] = invFact[i] * int64(i) % mod
	}

	ans := fact[n-len(sick)]
	if sick[0] > 0 {
		ans = ans * invFact[sick[0]] % mod
	}
	for i := 1; i < len(sick); i++ {
		gap := int64(sick[i] - sick[i-1] - 1)
		if gap > 0 {
			ans = ans * invFact[gap] % mod * pow2[gap-1] % mod
		}
	}
	if sick[len(sick)-1] < n-1 {
		ans = ans * invFact[n-1-sick[len(sick)-1]] % mod
	}
	return int(ans)
}
