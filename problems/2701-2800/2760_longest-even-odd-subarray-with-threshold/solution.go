// A window can only open on an even, within-threshold element; from there the
// right edge stretches while parities alternate and every element stays within
// the threshold. Resuming at each breaker keeps every index visited once.
func longestAlternatingSubarray(nums []int, threshold int) int {
	best := 0
	i := 0
	for i < len(nums) {
		// An odd or over-threshold element never starts a run.
		if nums[i]%2 != 0 || nums[i] > threshold {
			i++
			continue
		}
		j := i + 1
		for j < len(nums) && nums[j]%2 != nums[j-1]%2 && nums[j] <= threshold {
			j++
		}
		if j-i > best {
			best = j - i
		}
		// Sub-windows inside [i, j) are all shorter than this one, so
		// resume at the breaker: if it can start a window, it will.
		i = j
	}
	return best
}
