func numberOfWays(n int, m int, k int, source []int, dest []int) int {
	const mod = 1_000_000_007
	// lineCounts: walks of t steps (each step to a different position on a
	// line of `size` cells) ending at target vs anywhere else. A step into
	// target can come from any other position; a step elsewhere has
	// size - 1 options from target and size - 2 from any other position.
	lineCounts := func(size, start, target int) []int64 {
		a := make([]int64, k+1)
		b := make([]int64, k+1)
		if start == target {
			a[0] = 1
		} else {
			b[0] = 1
		}
		offByOne := int64(size-1) % mod
		offByTwo := int64(size-2) % mod
		for t := 0; t < k; t++ {
			a[t+1] = b[t]
			b[t+1] = (a[t]*offByOne + b[t]*offByTwo) % mod
		}
		return a
	}
	ax := lineCounts(n, source[0], dest[0])
	ay := lineCounts(m, source[1], dest[1])
	// Factorials for choosing which of the k moves change x.
	fact := make([]int64, k+1)
	fact[0] = 1
	for i := 1; i <= k; i++ {
		fact[i] = fact[i-1] * int64(i) % mod
	}
	power := func(base, exp int64) int64 {
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
	invFact := make([]int64, k+1)
	invFact[k] = power(fact[k], mod-2)
	for i := k; i >= 1; i-- {
		invFact[i-1] = invFact[i] * int64(i) % mod
	}
	// A move keeps one coordinate fixed, so x and y evolve independently:
	// with i of the k moves changing x, the x-walk has i steps, the y-walk
	// k - i steps, and their interleavings number C(k, i).
	var ans int64
	for i := 0; i <= k; i++ {
		comb := fact[k] * invFact[i] % mod * invFact[k-i] % mod
		ans = (ans + comb*ax[i]%mod*ay[k-i]) % mod
	}
	return int(ans)
}
