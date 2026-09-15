// An element qualifies exactly when it sits strictly between the array's
// minimum and maximum: a strictly smaller witness exists iff x > min, a
// strictly larger one iff x < max.
func countElements(nums []int) int {
	lo, hi := nums[0], nums[0]
	for _, x := range nums {
		if x < lo {
			lo = x
		}
		if x > hi {
			hi = x
		}
	}
	count := 0
	for _, x := range nums {
		if x > lo && x < hi {
			count++
		}
	}
	return count
}
