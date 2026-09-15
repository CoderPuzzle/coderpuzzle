func findValidElements(nums []int) []int {
	leftMax := append([]int(nil), nums...)
	for i := 1; i < len(nums); i++ {
		if leftMax[i-1] > leftMax[i] {
			leftMax[i] = leftMax[i-1]
		}
	}
	rightMax := append([]int(nil), nums...)
	for i := len(nums) - 2; i >= 0; i-- {
		if rightMax[i+1] > rightMax[i] {
			rightMax[i] = rightMax[i+1]
		}
	}

	valid := []int{}
	for i, value := range nums {
		if i == 0 || i == len(nums)-1 || value > leftMax[i-1] || value > rightMax[i+1] {
			valid = append(valid, value)
		}
	}
	return valid
}
