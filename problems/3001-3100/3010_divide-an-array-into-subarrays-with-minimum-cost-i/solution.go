func minimumCost(nums []int) int {
	smallest := nums[1]
	second := nums[2]
	if nums[2] < smallest {
		smallest = nums[2]
		second = nums[1]
	}
	for index := 3; index < len(nums); index++ {
		value := nums[index]
		if value < smallest {
			second = smallest
			smallest = value
		} else if value < second {
			second = value
		}
	}
	return nums[0] + smallest + second
}
