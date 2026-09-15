func getAverages(nums []int, k int) []int {
	averages := make([]int, len(nums))
	for index := range averages {
		averages[index] = -1
	}
	width := 2*k + 1
	if width > len(nums) {
		return averages
	}

	var windowSum int64
	for index := 0; index < width; index++ {
		windowSum += int64(nums[index])
	}
	averages[k] = int(windowSum / int64(width))
	for center := k + 1; center < len(nums)-k; center++ {
		windowSum += int64(nums[center+k])
		windowSum -= int64(nums[center-k-1])
		averages[center] = int(windowSum / int64(width))
	}
	return averages
}
