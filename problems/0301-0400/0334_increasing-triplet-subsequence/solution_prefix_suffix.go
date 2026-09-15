func increasingTriplet(nums []int) bool {
	n := len(nums)
	if n < 3 {
		return false
	}
	// leftMin[j]: smallest value strictly before j; rightMax[j]:
	// largest value strictly after j. The sentinel ends can never
	// satisfy the check, so every position tests uniformly.
	leftMin := make([]int, n)
	rightMax := make([]int, n)
	leftMin[0] = 1 << 62
	for j := 1; j < n; j++ {
		leftMin[j] = min(leftMin[j-1], nums[j-1])
	}
	rightMax[n-1] = -(1 << 62)
	for j := n - 2; j >= 0; j-- {
		rightMax[j] = max(rightMax[j+1], nums[j+1])
	}
	for j := 0; j < n; j++ {
		if leftMin[j] < nums[j] && nums[j] < rightMax[j] {
			return true
		}
	}
	return false
}
