func countGoodStrings(low int, high int, zero int, one int) int {
	const MOD = 1000000007
	// dp[L] = buildable strings of length L; dp[0] = 1 for the empty
	// string. A string's final block (zeros or ones) fixes its last
	// character, so the two cases are disjoint and exhaustive.
	dp := make([]int, high+1)
	dp[0] = 1
	for length := 1; length <= high; length++ {
		// Climb-stairs recurrence with step sizes zero and one; the
		// appended letter at each step fixes content, so distinct block
		// sequences are distinct strings.
		ways := 0
		if length >= zero {
			ways += dp[length-zero]
		}
		if length >= one {
			ways += dp[length-one]
		}
		dp[length] = ways % MOD
	}
	// Length is the only acceptance criterion, so sum lengths in range.
	total := 0
	for length := low; length <= high; length++ {
		total = (total + dp[length]) % MOD
	}
	return total
}
