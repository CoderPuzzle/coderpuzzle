func minRemovals(nums []int, target int) int {
	// dp[xor] = maximum number of elements we can KEEP with XOR == xor
	dp := map[int]int{0: 0}
	for _, x := range nums {
		type entry struct {
			key, val int
		}
		snapshot := make([]entry, 0, len(dp))
		for k, v := range dp {
			snapshot = append(snapshot, entry{k, v})
		}
		for _, e := range snapshot {
			nx := e.key ^ x
			if cur, ok := dp[nx]; !ok || e.val+1 > cur {
				dp[nx] = e.val + 1
			}
		}
	}
	if best, ok := dp[target]; ok {
		return len(nums) - best
	}
	return -1
}
