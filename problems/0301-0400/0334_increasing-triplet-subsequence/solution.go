func increasingTriplet(nums []int) bool {
	first := 1 << 62
	second := 1 << 62
	for _, value := range nums {
		if value <= first {
			first = value
		} else if value <= second {
			second = value
		} else {
			return true
		}
	}
	return false
}
