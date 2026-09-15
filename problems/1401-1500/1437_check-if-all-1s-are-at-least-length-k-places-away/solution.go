func kLengthApart(nums []int, k int) bool {
	previous := -1
	for index, value := range nums {
		if value == 1 {
			if previous >= 0 && index-previous <= k {
				return false
			}
			previous = index
		}
	}
	return true
}
