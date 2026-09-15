import "math/bits"

// Position i (1-indexed) may receive value v exactly when gcd(v, i) is 1.
// Precompute that compatibility grid once, then count valid permutations
// with a subset DP: dp[mask] is the number of ways to fill the first
// popcount(mask) positions using exactly the values in mask, so extending
// by the last-placed value v gives dp[mask] = sum over compatible v in mask
// of dp[mask without v]. Even the theoretical bound 12! fits an int.
func selfDivisiblePermutationCount(n int) int {
	compat := make([][]bool, n)
	for i := 1; i <= n; i++ {
		row := make([]bool, n)
		for v := 1; v <= n; v++ {
			row[v-1] = gcd(v, i) == 1
		}
		compat[i-1] = row
	}
	full := 1 << n
	dp := make([]int, full)
	dp[0] = 1
	for mask := 1; mask < full; mask++ {
		pos := bits.OnesCount(uint(mask)) // 1-indexed position being filled now
		row := compat[pos-1]
		total := 0
		for v := 0; v < n; v++ {
			if mask>>v&1 == 1 && row[v] {
				total += dp[mask^1<<v]
			}
		}
		dp[mask] = total
	}
	return dp[full-1]
}

func gcd(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
