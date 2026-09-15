func isZeroArray(nums []int, queries [][]int) bool {
	n := len(nums)
	// Difference array: +1 at l and -1 at r+1 per query; the spare slot
	// at index n absorbs the r+1 == n write without a bounds check.
	diff := make([]int64, n+1)
	for _, q := range queries {
		diff[q[0]] += 1
		diff[q[1]+1] -= 1
	}
	coverage := int64(0)
	// The prefix sum recovers how many queries cover each index. Each
	// covering query removes at most one unit there, so zeroing is
	// possible iff coverage never falls below nums[i].
	for i := 0; i < n; i++ {
		coverage += diff[i]
		if coverage < int64(nums[i]) {
			return false
		}
	}
	return true
}
