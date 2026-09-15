import "strconv"

// One walk extending the current run: sorted unique input makes every
// maximal run of consecutive integers contiguous, so a single left-to-right
// pass closes each range exactly once.
func summaryRanges(nums []int) []string {
	// Non-nil so an empty input serializes as [] rather than null.
	ranges := []string{}
	for i := 0; i < len(nums); i++ {
		start := i
		// The run extends while the next value is exactly one past the
		// current one. int is 64-bit here, so the +1 has full headroom
		// even at the 32-bit extremes the statement allows.
		for i+1 < len(nums) && nums[i+1] == nums[i]+1 {
			i++
		}
		// The run [nums[start], nums[i]] is maximal once the extension
		// stops; equal endpoints collapse to the bare "a" form.
		if nums[start] == nums[i] {
			ranges = append(ranges, strconv.Itoa(nums[start]))
		} else {
			ranges = append(ranges, strconv.Itoa(nums[start])+"->"+strconv.Itoa(nums[i]))
		}
	}
	return ranges
}
