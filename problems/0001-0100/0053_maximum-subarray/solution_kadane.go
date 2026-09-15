func maxSubArray(nums []int) int {
	// Kadane's algorithm: current is the best sum of a subarray ending
	// exactly here; the answer is its maximum over all indices.
	// Seeding with nums[0] (not 0) makes all-negative inputs come out
	// right: an empty-prefix 0 must not be allowed to win.
	best := nums[0]
	current := nums[0]
	for _, value := range nums[1:] {
		// Extend the best subarray ending at the previous index, or start
		// fresh: a negative running sum can only drag down what follows.
		if current < 0 {
			current = value
		} else {
			current += value
		}
		if current > best {
			best = current
		}
	}
	return best
}
