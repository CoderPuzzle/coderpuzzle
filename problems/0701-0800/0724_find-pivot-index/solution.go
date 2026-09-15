// One pass over prefix sums: the total and a running left sum give both
// sides of index i, since right = total - left - nums[i].
func pivotIndex(nums []int) int {
	total := 0
	for _, x := range nums {
		total += x
	}
	left := 0
	for i, x := range nums {
		if left == total-left-x {
			// The first qualifying index is the leftmost by construction.
			return i
		}
		left += x
	}
	return -1
}
