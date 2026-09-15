func countMaxOrSubsets(nums []int) int {
	maximum := 0
	for _, value := range nums {
		maximum |= value
	}

	var count func(int, int) int
	count = func(index int, current int) int {
		if index == len(nums) {
			if current == maximum {
				return 1
			}
			return 0
		}
		return count(index+1, current) + count(index+1, current|nums[index])
	}
	return count(0, 0)
}
