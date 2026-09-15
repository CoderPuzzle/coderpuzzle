func minPatches(nums []int, n int) int {
	patches := 0
	i := 0
	// Invariant: every sum in [1, reachable) is formable; reachable
	// itself is the smallest sum that is not.
	reachable := int64(1)
	for reachable <= int64(n) {
		// Consume nums[i] while it fits inside the covered range: it
		// extends coverage to [1, reachable + nums[i]) at no patch cost.
		if i < len(nums) && int64(nums[i]) <= reachable {
			reachable += int64(nums[i])
			i++
		} else {
			// Genuine gap: patch reachable itself (any smaller patch
			// covers less, any larger leaves the gap) and double.
			reachable += reachable
			patches++
		}
	}
	return patches
}
