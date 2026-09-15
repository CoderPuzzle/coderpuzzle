// dp[i + 1] = ways to partition the first i + 1 elements. The last segment
// is nums[j..i] for some start j; valid starts form a contiguous range
// ending at i, grown by lowering lo until the window spread is <= k.
// Monotonic deques expose the window min/max, pre holds prefix sums of dp
// so a range sum is one subtraction.
func countPartitions(nums []int, k int) int {
	const MOD = int64(1000000007)
	n := len(nums)
	dp := make([]int64, n+1)
	pre := make([]int64, n+2)
	dp[0] = 1
	pre[1] = 1
	lo := 0
	mins := []int{} // indices, values increasing toward the back
	maxs := []int{} // indices, values decreasing toward the back
	for i := 0; i < n; i++ {
		for len(mins) > 0 && nums[mins[len(mins)-1]] >= nums[i] {
			mins = mins[:len(mins)-1]
		}
		mins = append(mins, i)
		for len(maxs) > 0 && nums[maxs[len(maxs)-1]] <= nums[i] {
			maxs = maxs[:len(maxs)-1]
		}
		maxs = append(maxs, i)
		for nums[maxs[0]]-nums[mins[0]] > k {
			if mins[0] == lo {
				mins = mins[1:]
			}
			if maxs[0] == lo {
				maxs = maxs[1:]
			}
			lo++
		}
		dp[i+1] = (pre[i+1] - pre[lo] + MOD) % MOD
		pre[i+2] = (pre[i+1] + dp[i+1]) % MOD
	}
	return int(dp[n])
}
