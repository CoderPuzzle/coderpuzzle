func numOfWays(nums []int) int {
	const mod = 1000000007
	n := len(nums)

	// Factorials and their modular inverses (Fermat's little theorem: mod
	// is prime, so inv(k!) == (k!)^(mod-2) mod mod) answer every C(a, b)
	// query in O(1).
	fact := make([]int64, n+1)
	invFact := make([]int64, n+1)
	fact[0] = 1
	for i := 1; i <= n; i++ {
		fact[i] = fact[i-1] * int64(i) % mod
	}
	power := func(base, exp int64) int64 {
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
	invFact[n] = power(fact[n], mod-2)
	for i := n; i >= 1; i-- {
		invFact[i-1] = invFact[i] * int64(i) % mod
	}

	comb := func(a, b int) int64 {
		return fact[a] * invFact[b] % mod * invFact[a-b] % mod
	}

	// ways(arr) counts every reordering of arr (including arr itself) that
	// builds the same BST: split at the root arr[0], recurse on the
	// smaller-than-root and larger-than-root runs (each must keep its own
	// relative order), then multiply by the number of ways to interleave
	// the two runs into one sequence of their combined length, which is
	// the binomial coefficient of the two run sizes.
	var ways func(arr []int) int64
	ways = func(arr []int) int64 {
		if len(arr) <= 1 {
			return 1
		}
		root := arr[0]
		var left, right []int
		for _, v := range arr[1:] {
			if v < root {
				left = append(left, v)
			} else {
				right = append(right, v)
			}
		}
		c := comb(len(left)+len(right), len(left))
		return c * ways(left) % mod * ways(right) % mod
	}

	// The problem excludes the original array from the count.
	return int((ways(nums) - 1 + mod) % mod)
}
