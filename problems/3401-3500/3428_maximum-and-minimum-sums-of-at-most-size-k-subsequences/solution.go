import "sort"

// After sorting, nums[i] is the maximum of exactly those subsequences
// whose other members come from the i smaller entries: summed over sizes
// 1..k that is g(i) = sum_{j < k} C(i, j) subsequences, and symmetrically
// it is the minimum of g(n-1-i) of them (the larger entries). So the
// answer is sum nums[i] * (g(i) + g(n-1-i)) mod 10^9 + 7. Each partial
// row sum rolls in O(1): Pascal gives C(i, j) = C(i-1, j) + C(i-1, j-1),
// so g(i) = 2*g(i-1) - C(i-1, k-1), one binomial per step from factorial
// tables. n <= 10^5 keeps those tables small; every residue product stays
// below ~10^18, inside int64.
func minMaxSums(nums []int, k int) int {
	const mod = 1_000_000_007
	n := len(nums)
	sort.Ints(nums)

	fact := make([]int64, n)
	fact[0] = 1
	for i := 1; i < n; i++ {
		fact[i] = fact[i-1] * int64(i) % mod
	}
	invFact := make([]int64, n)
	invFact[n-1] = modPow(fact[n-1], mod-2, mod)
	for i := n - 1; i > 0; i-- {
		invFact[i-1] = invFact[i] * int64(i) % mod
	}
	choose := func(a, b int) int64 {
		if b < 0 || b > a {
			return 0
		}
		return fact[a] * invFact[b] % mod * invFact[a-b] % mod
	}

	g := make([]int64, n)
	g[0] = 1
	for i := 1; i < n; i++ {
		g[i] = (2*g[i-1]%mod + mod - choose(i-1, k-1)) % mod
	}
	var total int64
	for i, value := range nums {
		total = (total + int64(value)%mod*(g[i]+g[n-1-i])%mod) % mod
	}
	return int(total)
}

func modPow(base int64, exp int64, mod int64) int64 {
	result := int64(1)
	b := base % mod
	for exp > 0 {
		if exp&1 == 1 {
			result = result * b % mod
		}
		b = b * b % mod
		exp >>= 1
	}
	return result
}
