// Position i is touched only by the flips at i - 1 and at i, so scanning
// left to right every flip is forced: prev remembers whether the flip at
// i - 1 fired, and the flip at i must fire exactly when the resulting
// value misses the target.
func canMakeEqual(nums []int, k int) bool {
	canMake := func(target int) bool {
		ops := 0
		prev := false
		for i := 0; i+1 < len(nums); i++ {
			value := nums[i]
			if prev {
				value = -value
			}
			prev = value != target
			if prev {
				ops++
			}
		}
		// The last element has no flip of its own left: the target is only
		// reachable if it already came out right.
		last := nums[len(nums)-1]
		if prev {
			last = -last
		}
		return last == target && ops <= k
	}
	return canMake(1) || canMake(-1)
}
