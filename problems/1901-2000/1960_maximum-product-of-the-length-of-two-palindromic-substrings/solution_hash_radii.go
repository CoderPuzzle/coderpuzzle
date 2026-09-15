func maxProduct(s string) int64 {
	n := len(s)

	a := make([]int64, n)
	for i := 0; i < n; i++ {
		a[i] = int64(s[i] - 'a')
	}
	const MOD1 = 1000000007
	const MOD2 = 1000000009
	const BASE = 26

	// Precomputed base powers plus forward and reversed prefix hashes, so
	// any substring palindrome test costs O(1).
	pow1 := make([]int64, n+1)
	pow2 := make([]int64, n+1)
	pre1 := make([]int64, n+1)
	pre2 := make([]int64, n+1)
	rpre1 := make([]int64, n+1)
	rpre2 := make([]int64, n+1)
	pow1[0] = 1
	pow2[0] = 1
	for i := 1; i <= n; i++ {
		pow1[i] = pow1[i-1] * BASE % MOD1
		pow2[i] = pow2[i-1] * BASE % MOD2
		pre1[i] = (pre1[i-1]*BASE + a[i-1]) % MOD1
		pre2[i] = (pre2[i-1]*BASE + a[i-1]) % MOD2
		rpre1[i] = (rpre1[i-1]*BASE + a[n-i]) % MOD1
		rpre2[i] = (rpre2[i-1]*BASE + a[n-i]) % MOD2
	}

	// s[l..r] is a palindrome iff its forward hash equals the forward hash of
	// the mirrored window in the reversed string; two independent moduli make
	// a false match vanishingly unlikely.
	isPal := func(l, r int) bool {
		length := r - l + 1
		f1 := (pre1[r+1] - pre1[l]*pow1[length]) % MOD1
		if f1 < 0 {
			f1 += MOD1
		}
		g1 := (rpre1[n-l] - rpre1[n-1-r]*pow1[length]) % MOD1
		if g1 < 0 {
			g1 += MOD1
		}
		f2 := (pre2[r+1] - pre2[l]*pow2[length]) % MOD2
		if f2 < 0 {
			f2 += MOD2
		}
		g2 := (rpre2[n-l] - rpre2[n-1-r]*pow2[length]) % MOD2
		if g2 < 0 {
			g2 += MOD2
		}
		return f1 == g1 && f2 == g2
	}

	// A palindrome of radius k around c implies one at every smaller radius,
	// so the predicate is monotone: binary-search each center's maximal reach.
	d1 := make([]int, n)
	for c := 0; c < n; c++ {
		lo := 0
		hi := c
		if n-1-c < hi {
			hi = n - 1 - c
		}
		for lo < hi {
			mid := (lo + hi + 1) / 2
			if isPal(c-mid, c+mid) {
				lo = mid
			} else {
				hi = mid - 1
			}
		}
		d1[c] = lo + 1
	}

	// Record, per center, the longest odd palindrome that ends exactly
	// at each index and the longest that starts exactly at each index.
	bestEnd := make([]int64, n)
	bestStart := make([]int64, n)
	for c := 0; c < n; c++ {
		length := int64(2*d1[c] - 1)
		end := c + d1[c] - 1
		start := c - d1[c] + 1
		if length > bestEnd[end] {
			bestEnd[end] = length
		}
		if length > bestStart[start] {
			bestStart[start] = length
		}
	}

	// Shrink from the recorded maximum: a palindrome ending at i+1 of length L
	// implies one ending at i of length L-2 (drop one char from each side).
	for i := n - 2; i >= 0; i-- {
		candEnd := bestEnd[i+1] - 2
		if candEnd > bestEnd[i] {
			bestEnd[i] = candEnd
		}
	}
	for i := 1; i < n; i++ {
		candStart := bestStart[i-1] - 2
		if candStart > bestStart[i] {
			bestStart[i] = candStart
		}
	}

	// Prefix max of bestEnd / suffix max of bestStart = the longest
	// palindrome fully inside each prefix / suffix.
	pref := make([]int64, n)
	pref[0] = bestEnd[0]
	for i := 1; i < n; i++ {
		pref[i] = maxI64(pref[i-1], bestEnd[i])
	}

	suff := make([]int64, n)
	suff[n-1] = bestStart[n-1]
	for i := n - 2; i >= 0; i-- {
		suff[i] = maxI64(suff[i+1], bestStart[i])
	}

	// The two palindromes are disjoint, so some split separates them;
	// try every split. Single characters are length-1 palindromes, so
	// both sides always contribute at least 1.
	var ans int64 = 0
	for i := 0; i < n-1; i++ {
		candidate := pref[i] * suff[i+1]
		if candidate > ans {
			ans = candidate
		}
	}
	return ans
}

func maxI64(a, b int64) int64 {
	if a > b {
		return a
	}
	return b
}
