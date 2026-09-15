import "slices"

func longestSubarray(nums []int) int {
	// AND never exceeds any member, so the maximum subarray AND is
	// max(nums), and only subarrays made entirely of that value attain it:
	// adding anything smaller strictly lowers the AND. The answer is
	// therefore the longest run of consecutive occurrences of the maximum.
	target := slices.Max(nums)
	best, run := 0, 0
	for _, num := range nums {
		if num == target {
			run++
			if run > best {
				best = run
			}
		} else {
			run = 0
		}
	}
	return best
}
