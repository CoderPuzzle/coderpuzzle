// dp[i] is the maximum score of a hopping path that starts at index i and
// ends at the last element: the next hop goes to some j > i and pays
// (j - i) * nums[j] plus whatever the best continuation from j earns. Fill
// right to left; every hop distance telescopes into the n - 1 units between
// index 0 and the end, so the answer stays below (n - 1) * max(nums) < 2^31
// and plain ints suffice.
func maxScore(nums []int) int {
	n := len(nums)
	dp := make([]int, n)
	for i := n - 2; i >= 0; i-- {
		best := 0
		for j := i + 1; j < n; j++ {
			score := (j-i)*nums[j] + dp[j]
			if score > best {
				best = score
			}
		}
		dp[i] = best
	}
	return dp[0]
}
