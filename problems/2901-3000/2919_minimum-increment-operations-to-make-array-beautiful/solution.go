// Raising a position above k never helps, so each position i has a fixed
// cost max(0, k - nums[i]) for being raised; nums is beautiful exactly
// when every window of 3 consecutive positions contains a raised one.
// dp[i] = cheapest plan covering every window in the prefix ending at i
// with position i raised, and the previous raised position must be within
// distance 3. The total reaches 10^5 * 10^9 = 10^14, past int32 range, so
// the costs stay in int64.
func minIncrementOperations(nums []int, k int) int64 {
	a := int64(max(0, k-nums[0]))
	b := int64(max(0, k-nums[1]))
	c := int64(max(0, k-nums[2]))
	for i := 3; i < len(nums); i++ {
		// Only the last three states are ever read: roll the window.
		next := int64(max(0, k-nums[i])) + min(a, min(b, c))
		a, b, c = b, c, next
	}
	// The last raised position can be any of the final three.
	return min(a, min(b, c))
}
