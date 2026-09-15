import "sort"

// Sort a copy, then fill the even slots from the back of the lower half and
// the odd slots from the back of the upper half: reversing each half keeps
// median duplicates as far apart as possible.
func wiggleSort(nums []int) []int {
	ordered := append([]int(nil), nums...)
	sort.Ints(ordered)
	n := len(nums)
	m := (n + 1) / 2
	for k := 0; k < m; k++ {
		nums[2*k] = ordered[m-1-k]
	}
	for k := 0; k < n-m; k++ {
		nums[2*k+1] = ordered[n-1-k]
	}
	return nums
}
