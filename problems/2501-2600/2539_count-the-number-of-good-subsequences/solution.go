// A good subsequence is generated exactly once by its shared frequency
// m: each letter either sits out or contributes C(count, m) index
// choices, so every per-m product counts one term of the answer - plus
// the all-absent pick that surfaces in every product and is dropped once
// per term. Factorial tables modulo 1e9+7, division via Fermat inverses.
func countGoodSubsequences(s string) int {
	const mod = 1_000_000_007
	counts := make([]int, 26)
	for i := 0; i < len(s); i++ {
		counts[s[i]-'a']++
	}
	top := 0
	var present []int64
	for _, c := range counts {
		if c > top {
			top = c
		}
		if c > 0 {
			present = append(present, int64(c))
		}
	}
	fact := make([]int64, top+1)
	for i := range fact {
		fact[i] = 1
	}
	for i := 2; i <= top; i++ {
		fact[i] = fact[i-1] * int64(i) % mod
	}
	invFact := make([]int64, top+1)
	invFact[top] = modPow(fact[top], mod-2)
	for i := top; i > 0; i-- {
		invFact[i-1] = invFact[i] * int64(i) % mod
	}
	var total int64
	for m := 1; m <= top; m++ {
		prod := int64(1)
		for _, count := range present {
			prod = prod * (comb(count, int64(m), fact, invFact) + 1) % mod
		}
		total += prod - 1
	}
	return int(total % mod)
}

func comb(n, k int64, fact []int64, invFact []int64) int64 {
	const mod = 1_000_000_007
	if k > n {
		return 0
	}
	return fact[n] * invFact[k] % mod * invFact[n-k] % mod
}

func modPow(base, exp int64) int64 {
	const mod = 1_000_000_007
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
