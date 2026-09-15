// The suffix at i is total minus the prefix before it, so one running total
// plus the array total covers every index in a single pass.
func maximumSumScore(nums []int) int64 {
	var total int64
	for _, value := range nums {
		total += int64(value)
	}
	prefix := int64(0)
	best := -int64(1) << 62
	for _, value := range nums {
		prefix += int64(value)
		if front := prefix; front > best {
			best = front
		}
		if back := total - prefix + int64(value); back > best {
			best = back
		}
	}
	return best
}
