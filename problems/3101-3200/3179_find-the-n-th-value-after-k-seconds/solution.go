func valueAfterKSeconds(n int, k int) int {
	// Each second turns the array into its own prefix sums, so the
	// update is one in-place running sum repeated k times. Stored
	// values are always reduced below 10^9 + 7, and a sum of two such
	// residues stays well inside int range, so arithmetic never
	// overflows. After k seconds the last column has counted lattice
	// paths, giving the binomial C(n - 1 + k, k).
	const mod = 1000000007
	a := make([]int, n)
	for j := range a {
		a[j] = 1
	}
	for t := 0; t < k; t++ {
		for j := 1; j < n; j++ {
			a[j] = (a[j] + a[j-1]) % mod
		}
	}
	return a[n-1]
}
