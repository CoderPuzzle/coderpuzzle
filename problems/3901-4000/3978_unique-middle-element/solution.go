func isMiddleElementUnique(nums []int) bool {
	middle := nums[len(nums)/2]
	count := 0
	for _, value := range nums {
		if value == middle {
			count++
		}
	}
	return count == 1
}
