// A whole run of equal neighbors shares one pair of closest non-equal
// neighbors, so collapsing each maximal run of equal values to a single
// representative turns "count hills and valleys, once per run" into
// "count interior local extrema" of the compressed sequence. The
// endpoints of the compressed sequence are missing a non-equal neighbor
// on one side, which the interior-only loop encodes exactly.
func countHillValley(nums []int) int {
	compressed := []int{nums[0]}
	for _, value := range nums[1:] {
		if value != compressed[len(compressed)-1] {
			compressed = append(compressed, value)
		}
	}
	count := 0
	for i := 1; i+1 < len(compressed); i++ {
		left, mid, right := compressed[i-1], compressed[i], compressed[i+1]
		if (mid > left && mid > right) || (mid < left && mid < right) {
			count++
		}
	}
	return count
}
