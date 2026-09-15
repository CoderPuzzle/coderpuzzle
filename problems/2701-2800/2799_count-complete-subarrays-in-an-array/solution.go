func countCompleteSubarrays(nums []int) int {
	distinctValues := map[int]bool{}
	for _, value := range nums {
		distinctValues[value] = true
	}
	// A subarray is complete exactly when it holds every distinct value of
	// the whole array: atMostDistinct(k) counts it, atMostDistinct(k-1) does not.
	return atMostDistinct(nums, len(distinctValues)) - atMostDistinct(nums, len(distinctValues)-1)
}

// atMostDistinct returns the number of subarrays holding at most `limit`
// distinct values, counted by right endpoint with a forward-only left boundary.
func atMostDistinct(nums []int, limit int) int {
	freq := map[int]int{}
	distinct := 0
	left := 0
	count := 0
	for right, value := range nums {
		freq[value]++
		if freq[value] == 1 {
			distinct++
		}
		for distinct > limit {
			freq[nums[left]]--
			if freq[nums[left]] == 0 {
				distinct--
			}
			left++
		}
		// every start in [left, right] keeps the window within limit
		// (limit 0 shrinks every window empty, contributing nothing)
		count += right - left + 1
	}
	return count
}
