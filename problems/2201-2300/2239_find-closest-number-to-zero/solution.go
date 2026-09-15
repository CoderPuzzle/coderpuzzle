func findClosestNumber(nums []int) int {
	best := nums[0]
	for _, x := range nums {
		ax, ab := x, best
		if ax < 0 {
			ax = -ax
		}
		if ab < 0 {
			ab = -ab
		}
		if ax < ab || (ax == ab && x > best) {
			best = x
		}
	}
	return best
}
