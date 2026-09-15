// Bounds: n <= 10^5 and nums[i] <= 10^5, so the rob-everything extreme
// reaches 10^10 — everything lives comfortably in an int64.
// prev1/prev2 carry dp[i-1]/dp[i-2]: the best haul from houses up to i-1 /
// i-2. dp is monotone, so when colors differ the adjacent take nums[i] +
// dp[i-1] dominates the non-adjacent nums[i] + dp[i-2].
func rob(nums []int, colors []int) int64 {
	prev2 := int64(0)
	prev1 := int64(nums[0])
	for i := 1; i < len(nums); i++ {
		base := prev2
		if colors[i] != colors[i-1] {
			base = prev1
		}
		take := int64(nums[i]) + base
		best := prev1
		if take > best {
			best = take
		}
		prev2, prev1 = prev1, best
	}
	return prev1
}
