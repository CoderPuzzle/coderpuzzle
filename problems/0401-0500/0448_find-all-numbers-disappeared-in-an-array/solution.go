// Values in [1, n] let the array index itself be the hash: value v maps to
// slot v-1, and flipping that slot's sign records "v seen". A value that never
// appears leaves its slot positive. A second sweep reads the marks — slot i
// positive means i+1 never appeared — restoring every flip on the way out so
// the array is left as found; index order is value order, so the pinned
// ascending output is free.
func findDisappearedNumbers(nums []int) []int {
	// make (never a nil slice) so an empty answer marshals as [] not null;
	// len(nums) is the output's upper bound: at most n-1 values disappear.
	disappeared := make([]int, 0, len(nums))
	for _, value := range nums {
		index := abs(value) - 1
		if nums[index] > 0 {
			nums[index] = -nums[index]
		}
	}
	for index, value := range nums {
		if value > 0 {
			disappeared = append(disappeared, index+1)
		} else {
			nums[index] = -value
		}
	}
	return disappeared
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
