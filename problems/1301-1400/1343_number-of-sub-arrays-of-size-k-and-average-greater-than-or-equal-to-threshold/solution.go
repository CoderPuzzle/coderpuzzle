func numOfSubarrays(arr []int, k int, threshold int) int {
	// window_sum >= k * threshold is the exact integer form of
	// "average >= threshold"; the window updates in O(1) per slide.
	need := k * threshold
	window := 0
	for i := 0; i < k; i++ {
		window += arr[i]
	}
	count := 0
	if window >= need {
		count = 1
	}
	for i := k; i < len(arr); i++ {
		window += arr[i] - arr[i-k]
		if window >= need {
			count++
		}
	}
	return count
}
