func resultArray(nums []int, k int) []int64 {
	// Removing a prefix and a suffix is the same as choosing the non-empty
	// contiguous middle that survives, so result[x] counts subarrays whose
	// product is x mod k. The running DP extends every subarray ending at
	// the previous element by nums[i] and adds the singleton [i]. Counts
	// reach 5,000,050,000 for n = 10^5 — beyond int32 — and r * nums[i]
	// reaches 4 * 10^9, so both live in int64.
	counts := make([]int64, k)
	result := make([]int64, k)
	for _, num := range nums {
		extended := make([]int64, k)
		for r := 0; r < k; r++ {
			if counts[r] > 0 {
				extended[int64(r)*int64(num)%int64(k)] += counts[r]
			}
		}
		extended[num%k] += 1
		for r := 0; r < k; r++ {
			result[r] += extended[r]
		}
		counts = extended
	}
	return result
}
