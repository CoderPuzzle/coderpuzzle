func findMaxAverage(nums []int, k int) float64 {
	// Every window has length k, so the best average is the best window
	// sum divided by k once at the end: keep the sum in an exact integer
	// and let the single division decide precision.
	window := int64(0)
	for index := 0; index < k; index++ {
		window += int64(nums[index])
	}
	best := window
	for index := k; index < len(nums); index++ {
		window += int64(nums[index]) - int64(nums[index-k])
		if window > best {
			best = window
		}
	}
	return float64(best) / float64(k)
}
