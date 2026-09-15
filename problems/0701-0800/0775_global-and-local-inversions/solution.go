// Every local inversion is also a global one, so the two counts are equal
// exactly when no pair (k, i) with k <= i - 2 has nums[k] > nums[i]. Scan
// left to right holding the max of nums[0..i-2]; an element below it is
// such a non-local inversion.
func isIdealPermutation(nums []int) bool {
	prefixMax := 0
	for i := 1; i < len(nums); i++ {
		if nums[i] < prefixMax {
			return false
		}
		if nums[i-1] > prefixMax {
			prefixMax = nums[i-1]
		}
	}
	return true
}
