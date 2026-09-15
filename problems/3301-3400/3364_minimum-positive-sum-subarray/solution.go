func minimumSumSubarray(nums []int, l int, r int) int {
	// Prefix sums turn each candidate window into an O(1) subtraction, so
	// scanning every (start, length) pair is O(n^2) windows overall. With
	// n <= 100 and |nums[i]| <= 1000 every partial sum stays far inside
	// 32-bit range.
	prefix := make([]int, len(nums)+1)
	for i, value := range nums {
		prefix[i+1] = prefix[i] + value
	}
	best := -1
	for start := range nums {
		for length := l; length <= r; length++ {
			end := start + length
			if end > len(nums) {
				break
			}
			total := prefix[end] - prefix[start]
			if total > 0 && (best == -1 || total < best) {
				best = total
			}
		}
	}
	return best
}
