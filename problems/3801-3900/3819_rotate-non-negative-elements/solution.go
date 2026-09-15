// Gather the non-negative values in scan order, compute the effective
// left shift k % m once, then scatter values[(j + shift) % m] into the
// j-th originally non-negative slot — negatives are never touched.
func rotateElements(nums []int, k int) []int {
	values := make([]int, 0, len(nums))
	for _, value := range nums {
		if value >= 0 {
			values = append(values, value)
		}
	}
	m := len(values)
	result := make([]int, len(nums))
	copy(result, nums)
	if m == 0 {
		return result
	}
	shift := k % m
	at := 0
	for index, value := range nums {
		if value >= 0 {
			result[index] = values[(at+shift)%m]
			at++
		}
	}
	return result
}
