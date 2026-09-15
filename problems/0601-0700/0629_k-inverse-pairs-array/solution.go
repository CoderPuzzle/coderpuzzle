// dp[j] counts the arrangements of the numbers placed so far that have
// exactly j inverse pairs; inserting the new maximum m into any of its m
// slots adds between 0 and m-1 pairs, so row m at j is the sliding-window
// sum of row m-1 over [j-m+1, j]. `window` is int64: before its reduction
// it can reach 3 * (10^9 + 7), past 32-bit range.
func kInversePairs(n int, k int) int {
	const mod = 1_000_000_007
	dp := make([]int64, k+1)
	next := make([]int64, k+1)
	dp[0] = 1
	for m := 2; m <= n; m++ {
		var window int64
		for j := 0; j <= k; j++ {
			window += dp[j]
			if j >= m {
				window += mod - dp[j-m]
			}
			window %= mod
			next[j] = window
		}
		dp, next = next, dp
	}
	return int(dp[k])
}
