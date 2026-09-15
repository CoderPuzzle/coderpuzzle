func goodBinaryStrings(minLength int, maxLength int, oneGroup int, zeroGroup int) int {
	// dp[i] counts good strings of length i: peel off the final run of
	// equal characters — its size is a positive multiple of oneGroup or
	// zeroGroup, and what remains is any shorter good string (or nothing).
	const mod = 1_000_000_007
	dp := make([]int64, maxLength+1)
	dp[0] = 1
	for i := 1; i <= maxLength; i++ {
		var v int64
		if i >= oneGroup {
			v += dp[i-oneGroup]
		}
		if i >= zeroGroup {
			v += dp[i-zeroGroup]
		}
		dp[i] = v % mod
	}
	var total int64
	for i := minLength; i <= maxLength; i++ {
		total += dp[i]
	}
	return int(total % mod)
}
