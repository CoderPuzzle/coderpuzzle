func smallestEqual(nums []int) int {
	for index, value := range nums {
		if index%10 == value {
			return index
		}
	}
	return -1
}
