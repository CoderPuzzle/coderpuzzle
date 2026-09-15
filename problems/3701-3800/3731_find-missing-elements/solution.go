// Mark presence per value, then sweep the original range [min, max] in
// increasing order: every unmarked value is missing, and sweeping in order
// yields the sorted result directly.
func findMissingElements(nums []int) []int {
	lo, hi := nums[0], nums[0]
	for _, value := range nums {
		if value < lo {
			lo = value
		}
		if value > hi {
			hi = value
		}
	}
	present := make([]bool, hi+1)
	for _, value := range nums {
		present[value] = true
	}
	missing := []int{}
	for value := lo; value <= hi; value++ {
		if !present[value] {
			missing = append(missing, value)
		}
	}
	return missing
}
