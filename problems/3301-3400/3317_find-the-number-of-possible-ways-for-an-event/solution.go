// dp[j] counts the assignments of the first i performers onto exactly j
// nonempty of the x stages. The next performer either joins one of the j
// formed bands or opens one on one of the x - j + 1 unused stages; walking
// j downward updates the row in place. Each j-band arrangement later takes
// a score per band, so the answer sums dp[j] * y^j. All arithmetic is
// modulo 1e9 + 7, applied bottom-up over performers and bands -- no
// recursion. Residues are < 2^30 and every intermediate product < 2e12, so
// 64-bit int covers each step exactly.
func numberOfWays(n int, x int, y int) int {
	const MOD = 1000000007
	dp := make([]int, x+1)
	dp[0] = 1
	for i := 1; i <= n; i++ {
		top := i
		if top > x {
			top = x
		}
		for j := top; j >= 1; j-- {
			dp[j] = (dp[j]*j + dp[j-1]*(x-j+1)) % MOD
		}
		dp[0] = 0
	}
	ans := 0
	power := 1
	for j := 1; j <= x; j++ {
		power = power * y % MOD
		ans = (ans + dp[j]*power) % MOD
	}
	return ans
}
