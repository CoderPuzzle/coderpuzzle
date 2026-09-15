func minSwaps(nums []int) int {
	n := len(nums)
	ones := 0
	for _, value := range nums {
		ones += value
	}
	windowOnes := 0
	for index := 0; index < ones; index++ {
		windowOnes += nums[index]
	}
	best := windowOnes
	for start := 1; start < n; start++ {
		windowOnes -= nums[start-1]
		windowOnes += nums[(start+ones-1)%n]
		if windowOnes > best {
			best = windowOnes
		}
	}
	return ones - best
}
