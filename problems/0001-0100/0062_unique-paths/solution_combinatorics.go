func uniquePaths(m int, n int) int {
	// Every path is m-1 downs and n-1 rights in some order, so counting
	// paths is counting arrangements: C(m+n-2, m-1).
	big := int64(m + n - 2)
	small := int64(min(m-1, n-1))
	// Multiplicative formula: after step j the running value is exactly
	// C(big-small+j, j), so every division is exact. int64s absorb the
	// intermediate product even where the answer fits an int.
	result := int64(1)
	for j := int64(1); j <= small; j++ {
		result = result * (big - small + j) / j
	}
	return int(result)
}
