// dp[i] = fewest balanced pieces covering the first i characters.
// Extending a candidate start leftwards one letter at a time keeps its
// counts in an array while tracking how many letters are live and the
// largest count seen; the window is balanced exactly when live * largest
// equals its length, which makes each dp[i] one backwards sweep away.
func minimumSubstringsInPartition(s string) int {
	n := len(s)
	const inf = 1 << 30
	dp := make([]int, n+1)
	for i := 1; i <= n; i++ {
		dp[i] = inf
	}
	for i := 1; i <= n; i++ {
		var counts [26]int
		live, top := 0, 0
		for right := i - 1; right >= 0; right-- {
			b := int(s[right] - 'a')
			if counts[b] == 0 {
				live++
			}
			counts[b]++
			if counts[b] > top {
				top = counts[b]
			}
			if live*top == i-right && dp[right]+1 < dp[i] {
				dp[i] = dp[right] + 1
			}
		}
	}
	return dp[n]
}
