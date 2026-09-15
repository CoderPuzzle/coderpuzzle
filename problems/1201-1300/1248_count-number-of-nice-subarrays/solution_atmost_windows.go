func numberOfSubarrays(nums []int, k int) int {
	// "Exactly k odds" resists a direct window, but "at most limit odds"
	// repairs any breach from the left, so exactly k is the subtraction of
	// one such budget from a slightly larger one.
	return atMostOdds(nums, k) - atMostOdds(nums, k-1)
}

// atMostOdds counts subarrays holding at most limit odds: with [left,
// right] inside the budget and left the smallest such start, every opening
// from left onward qualifies, so right - left + 1 subarrays ending here
// join the total. Never called with limit < 0 under the statement's k >= 1.
func atMostOdds(nums []int, limit int) int {
	if limit < 0 {
		return 0
	}
	left := 0
	odds := 0
	total := 0
	for right := 0; right < len(nums); right++ {
		odds += nums[right] & 1
		// An odd broke the budget: retire odds from the left until it
		// holds again. Both ends only ever advance, so the sweep stays
		// linear.
		for odds > limit {
			odds -= nums[left] & 1
			left++
		}
		total += right - left + 1
	}
	return total
}
