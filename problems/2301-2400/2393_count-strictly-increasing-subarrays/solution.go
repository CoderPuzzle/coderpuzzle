func countSubarrays(nums []int) int64 {
	// run counts strictly increasing subarrays ending at the current
	// index: it grows by one while the rise continues, resets to 1
	// otherwise. Summing counts every subarray exactly once, by its
	// right endpoint.
	var total int64
	var run int64
	for i := 0; i < len(nums); i++ {
		if i > 0 && nums[i-1] < nums[i] {
			run++
		} else {
			run = 1
		}
		total += run
	}
	return total
}
