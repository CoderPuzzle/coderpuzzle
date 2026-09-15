// dp over prefixes: dp[j][i] = smallest achievable "maximum part XOR"
// splitting the first i elements into j parts. The last part of an
// optimal split is nums[t..i-1], whose XOR is pre[i] ^ pre[t], so
// dp[j][i] = min over t of max(dp[j-1][t], pre[i] ^ pre[t]).
// Rows roll: prev is dp[j-1], cur becomes dp[j].
func minXor(nums []int, k int) int {
	n := len(nums)
	pre := make([]int, n+1)
	for i, value := range nums {
		pre[i+1] = pre[i] ^ value
	}

	const big = int(^uint(0) >> 1)     // max int sentinel; every XOR is < 2^30
	prev := append([]int(nil), pre...) // dp[1][i] = XOR of the whole prefix
	for j := 2; j <= k; j++ {
		cur := make([]int, n+1)
		for i := range cur {
			cur[i] = big
		}
		for i := j; i <= n; i++ {
			pi := pre[i]
			best := big
			for t := j - 1; t < i; t++ {
				candidate := prev[t]
				if x := pi ^ pre[t]; x > candidate {
					candidate = x
				}
				if candidate < best {
					best = candidate
				}
			}
			cur[i] = best
		}
		prev = cur
	}
	return prev[n]
}
