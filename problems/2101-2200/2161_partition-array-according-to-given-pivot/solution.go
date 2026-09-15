// Stable three-way partition: gather each comparison class in its original
// order and concatenate, which preserves the relative order inside the less
// and greater groups by construction.
func pivotArray(nums []int, pivot int) []int {
	var less, equal, greater []int
	for _, value := range nums {
		switch {
		case value < pivot:
			less = append(less, value)
		case value > pivot:
			greater = append(greater, value)
		default:
			equal = append(equal, value)
		}
	}
	result := make([]int, 0, len(nums))
	result = append(result, less...)
	result = append(result, equal...)
	result = append(result, greater...)
	return result
}
