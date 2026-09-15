func minimumDeletions(nums []int) int {
	minimumIndex := 0
	maximumIndex := 0
	for index := 1; index < len(nums); index++ {
		if nums[index] < nums[minimumIndex] {
			minimumIndex = index
		}
		if nums[index] > nums[maximumIndex] {
			maximumIndex = index
		}
	}

	left, right := minimumIndex, maximumIndex
	if left > right {
		left, right = right, left
	}
	answer := right + 1
	if len(nums)-left < answer {
		answer = len(nums) - left
	}
	if left+1+len(nums)-right < answer {
		answer = left + 1 + len(nums) - right
	}
	return answer
}
