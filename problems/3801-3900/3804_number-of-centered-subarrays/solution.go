func centeredSubarrays(nums []int) int {
	// Totals stay within 500 * 10^5 = 5 * 10^7 and the count within
	// 125,250, so int arithmetic carries both without overflow.
	n := len(nums)
	count := 0
	// Anchor the left end and grow the right, carrying the window sum
	// and a counter of the values currently inside the window. The
	// window [i..j] is centered exactly when its running total is one
	// of the values the counter holds.
	for i := 0; i < n; i++ {
		window := make(map[int]int)
		total := 0
		for j := i; j < n; j++ {
			total += nums[j]
			window[nums[j]]++
			if window[total] > 0 {
				count++
			}
		}
	}
	return count
}
