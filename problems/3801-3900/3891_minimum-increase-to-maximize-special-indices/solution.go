// Special indices are strict peaks that can only be raised, so two of them can
// never be adjacent: the achievable maximum is a largest independent set of the
// interior positions, and the cheapest such set is the answer. Raising i above
// both original neighbours costs max(0, max(nums[i-1], nums[i+1]) + 1 - nums[i])
// — a peak's neighbours are never peaks themselves, so they keep their original
// values.
func minIncrease(nums []int) int64 {
	n := len(nums)
	const INF int64 = 4e18
	// Best (count, cost) pair up to the current position, keyed by whether
	// that position is picked; the comparison is (max count, min cost).
	notCount, notCost := 0, int64(0)
	pickCount, pickCost := -1, INF
	for i := 1; i < n-1; i++ {
		neighbor := nums[i-1]
		if nums[i+1] > neighbor {
			neighbor = nums[i+1]
		}
		cost := int64(neighbor) + 1 - int64(nums[i])
		if cost < 0 {
			cost = 0
		}
		// Picking i requires the previous position to be unpicked.
		curPickCount, curPickCost := notCount+1, notCost+cost
		// Skipping i keeps whichever previous state is better.
		var curNotCount int
		var curNotCost int64
		if pickCount > notCount || (pickCount == notCount && pickCost < notCost) {
			curNotCount, curNotCost = pickCount, pickCost
		} else {
			curNotCount, curNotCost = notCount, notCost
		}
		notCount, notCost = curNotCount, curNotCost
		pickCount, pickCost = curPickCount, curPickCost
	}
	if pickCount > notCount || (pickCount == notCount && pickCost < notCost) {
		return pickCost
	}
	return notCost
}
