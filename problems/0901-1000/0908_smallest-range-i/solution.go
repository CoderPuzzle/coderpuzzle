// Only the two ends matter: each element can travel at most k, so the best
// plan lifts the minimum and lowers the maximum by k each.
func smallestRangeI(nums []int, k int) int {
	low, high := nums[0], nums[0]
	for _, value := range nums[1:] {
		if value < low {
			low = value
		} else if value > high {
			high = value
		}
	}
	// The span shrinks by 2k at best and a score can never go below zero.
	if span := high - low - 2*k; span > 0 {
		return span
	}
	return 0
}
