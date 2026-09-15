func sumScores(s string) int64 {
	n := len(s)
	if n == 0 {
		return 0
	}
	a := make([]int64, n)
	for i := 0; i < n; i++ {
		a[i] = int64(s[i] - 'a')
	}
	const MOD1 = 1000000007
	const MOD2 = 1000000009
	const BASE = 26

	// Prefix hashes under two independent moduli plus base powers, so any
	// question "does the suffix at i agree with the prefix for L chars?" is
	// answered from three table reads.
	pow1 := make([]int64, n+1)
	pow2 := make([]int64, n+1)
	pre1 := make([]int64, n+1)
	pre2 := make([]int64, n+1)
	pow1[0] = 1
	pow2[0] = 1
	for i := 1; i <= n; i++ {
		pow1[i] = pow1[i-1] * BASE % MOD1
		pow2[i] = pow2[i-1] * BASE % MOD2
		pre1[i] = (pre1[i-1]*BASE + a[i-1]) % MOD1
		pre2[i] = (pre2[i-1]*BASE + a[i-1]) % MOD2
	}

	// The prefix's own hash is pre[L]; the suffix-at-i window's hash is
	// pre[i+L] - pre[i] * BASE^L, normalized. Agreement under both moduli
	// accepts the length; a coincidental double match is a collision, roughly
	// one chance in 10^18 per probe.
	agrees := func(i, l int) bool {
		h1 := (pre1[i+l] - pre1[i]*pow1[l]) % MOD1
		if h1 < 0 {
			h1 += MOD1
		}
		h2 := (pre2[i+l] - pre2[i]*pow2[l]) % MOD2
		if h2 < 0 {
			h2 += MOD2
		}
		return h1 == pre1[l] && h2 == pre2[l]
	}

	// Agreement for L characters implies agreement at every shorter length, so
	// the predicate is prefix-monotone: binary-search each suffix's longest
	// common prefix with s. s itself scores n.
	total := int64(n)
	for i := 1; i < n; i++ {
		lo, hi := 0, n-i
		for lo < hi {
			mid := (lo + hi + 1) / 2
			if agrees(i, mid) {
				lo = mid
			} else {
				hi = mid - 1
			}
		}
		total += int64(lo)
	}
	return total
}
