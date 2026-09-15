// Sort the k segments by left endpoint: l_1 < r_1, l_2 < r_2, ..., l_k <
// r_k, with r_i <= l_(i+1) (equality allowed, since segments may touch at
// a shared endpoint but not overlap). Shift the i-th pair by (i - 1):
// a_i = l_i + (i - 1), b_i = r_i + (i - 1). Each within-segment
// inequality l_i < r_i stays strict after an equal shift, and each
// between-segment inequality r_i <= l_(i+1) becomes b_i = r_i + (i - 1) <
// l_(i+1) + i = a_(i+1), now strict too. So (a_1, b_1, ..., a_k, b_k) is
// a strictly increasing sequence of 2k integers drawn from
// [0, n - 1 + (k - 1)], a range of n + k - 1 values, and this shift is a
// bijection onto strictly increasing sequences there. Choosing which 2k
// of those n + k - 1 values appear determines the whole set, so the
// answer is C(n + k - 1, 2k).
func numberOfSets(n int, k int) int {
	const mod = 1_000_000_007
	total := n + k - 1
	pick := 2 * k
	fact := make([]int64, total+1)
	fact[0] = 1
	for i := 1; i <= total; i++ {
		fact[i] = fact[i-1] * int64(i) % mod
	}
	invPick := modPow(fact[pick], mod-2, mod)
	invRest := modPow(fact[total-pick], mod-2, mod)
	return int(fact[total] % mod * invPick % mod * invRest % mod)
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
