// All but one value occurs exactly once, so the first value to appear
// a second time can only be the one repeated n times. One pass keeps
// a hash set of the values met so far and returns the moment the
// current value is already a member; the n copies guarantee that
// collision happens before the scan ends.
func repeatedNTimes(nums []int) int {
	seen := map[int]bool{}
	for _, value := range nums {
		if seen[value] {
			return value
		}
		seen[value] = true
	}
	return -1
}
