// Fix an unordered pair of cells: both carry a piece in exactly
// C(m*n - 2, k - 2) arrangements (place the remaining k - 2 pieces
// anywhere else), so the answer is (pairwise distance sum over all cell
// pairs) * C(m*n - 2, k - 2) mod 10^9 + 7. By axis separation, rows d
// apart pair with n columns on each side, so the board sum is
// n^2 * T(m) + m^2 * T(n) with T(M) = M * (M - 1) * (M + 1) / 6 --
// three consecutive integers, so the division is exact. M <= 10^5 keeps
// M^3 <= 10^15 and every residue product below ~10^18, all inside int64;
// n * n alone would overflow int32, so it widens first.
func distanceSum(m int, n int, k int) int {
	const mod = 1_000_000_007
	total := m * n

	fact := make([]int64, total+1)
	fact[0] = 1
	for i := 1; i <= total; i++ {
		fact[i] = fact[i-1] * int64(i) % mod
	}
	invFact := make([]int64, total+1)
	invFact[total] = modPow(fact[total], mod-2, mod)
	for i := total; i > 0; i-- {
		invFact[i-1] = invFact[i] * int64(i) % mod
	}

	tri := func(dim int64) int64 {
		return dim * (dim - 1) * (dim + 1) / 6 % mod
	}
	pairs := (int64(n)*int64(n)%mod*tri(int64(m)) + int64(m)*int64(m)%mod*tri(int64(n))) % mod
	choose := fact[total-2] * invFact[k-2] % mod * invFact[total-k] % mod
	return int(pairs * choose % mod)
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
