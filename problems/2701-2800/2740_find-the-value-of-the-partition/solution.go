import "sort"

// Sort + scan adjacent gaps: a partition's value is the distance between one
// cross-side pair (max of nums1 against min of nums2), which can never beat
// the closest two values in the array, and a split around that closest sorted
// pair realizes it exactly.
func findValueOfPartition(nums []int) int {
	// Work on a copy so the caller's slice keeps its original order.
	values := make([]int, len(nums))
	copy(values, nums)
	sort.Ints(values)
	best := values[1] - values[0]
	for i := 2; i < len(values); i++ {
		if gap := values[i] - values[i-1]; gap < best {
			best = gap
		}
	}
	return best
}
