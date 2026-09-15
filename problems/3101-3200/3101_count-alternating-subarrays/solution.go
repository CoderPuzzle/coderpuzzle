func countAlternatingSubarrays(nums []int) int64 {
	// The answer reaches n * (n + 1) / 2 = 5,000,050,000 at the bounds,
	// past what an int can hold, so accumulate in an int64.
	var count int64
	var current int64
	for index := 0; index < len(nums); index++ {
		if index > 0 && nums[index] == nums[index-1] {
			current = 1
		} else {
			current++
		}
		count += current
	}
	return count
}
