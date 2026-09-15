// dp[i] = cheapest way to acquire everything from fruit i onward when
// fruit i itself is purchased. Buying fruit i makes fruits i+1..2i+1
// free, so if that reaches the end dp[i] = prices[i]; otherwise the next
// purchase lands on some j in [i+1, 2i+2] and dp[i] = prices[i] +
// min(dp[j]). Sweeping i right to left, that window's edges only move
// left, so a monotonic window supplies the minimum in O(1). Costs reach
// 1000 * 10^5 = 10^8, inside int.
func minimumCoins(prices []int) int {
	n := len(prices)
	dp := make([]int, n)
	win := make([]int, n)
	head, tail := 0, 0 // win[head:tail] holds candidate indices, oldest
	// first, dp values non-decreasing toward the newest
	for i := n - 1; i >= 0; i-- {
		j := i + 1
		if j < n {
			for tail > head && dp[win[tail-1]] > dp[j] {
				tail--
			}
			win[tail] = j
			tail++
		}
		for head < tail && win[head] > 2*i+2 {
			head++
		}
		if 2*i+1 >= n-1 {
			dp[i] = prices[i]
		} else {
			dp[i] = prices[i] + dp[win[head]]
		}
	}
	return dp[0]
}
