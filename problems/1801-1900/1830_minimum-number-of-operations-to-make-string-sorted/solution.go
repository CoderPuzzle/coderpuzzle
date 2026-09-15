// Each operation steps s to its previous lexicographic permutation, so the
// operation count is the number of distinct permutations of the multiset
// that are strictly smaller than s. That rank minus one splits per
// position: with rem slots after i, any remaining letter smaller than s[i]
// can lead them in rem! / prod(cnt!) arrangements — cnt of the chosen
// letter one lower. Keeping den = prod(1/cnt!) incrementally folds the
// multinomial into one multiply per step: the summed contribution is
// fact[rem] * den * sum(smaller counts), and placing s[i] itself
// multiplies den by its pre-placement count. Every residue product stays
// below (10^9 + 7)^2 ~ 10^18, inside int64 range.
func makeStringSorted(s string) int {
	const mod = 1_000_000_007
	n := len(s)
	fact := make([]int64, n+1)
	fact[0] = 1
	for i := 1; i <= n; i++ {
		fact[i] = fact[i-1] * int64(i) % mod
	}
	invFact := make([]int64, n+1)
	invFact[n] = modPow(fact[n], mod-2, mod)
	for i := n; i > 0; i-- {
		invFact[i-1] = invFact[i] * int64(i) % mod
	}
	var cnt [26]int64
	for i := 0; i < n; i++ {
		cnt[s[i]-'a']++
	}
	den := int64(1)
	for k := 0; k < 26; k++ {
		den = den * invFact[cnt[k]] % mod
	}
	ans := int64(0)
	for i := 0; i < n; i++ {
		c := s[i] - 'a'
		smaller := int64(0)
		for a := 0; a < int(c); a++ {
			smaller += cnt[a]
		}
		ans = (ans + fact[n-1-i]*den%mod*smaller) % mod
		den = den * cnt[c] % mod
		cnt[c]--
	}
	return int(ans)
}

func modPow(base, exp, mod int64) int64 {
	result := int64(1)
	base %= mod
	for exp > 0 {
		if exp&1 == 1 {
			result = result * base % mod
		}
		base = base * base % mod
		exp >>= 1
	}
	return result
}
