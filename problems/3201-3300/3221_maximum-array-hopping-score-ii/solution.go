// The optimal path always lands on the farthest index attaining the maximum
// of the remaining suffix: every element after the current position is at
// most that maximum, so routing through it trades each leg for at least as
// much value per unit of distance over the same ground, and equal maxima
// favor the later occurrence (same value, longer hop). Build those farthest
// suffix argmaxes right to left, then walk the chain from index 0.
func maxScore(nums []int) int64 {
	n := len(nums)
	farthest := make([]int, n)
	farthest[n-1] = n - 1
	for i := n - 2; i >= 0; i-- {
		if nums[i] > nums[farthest[i+1]] {
			farthest[i] = i
		} else {
			farthest[i] = farthest[i+1]
		}
	}
	score := int64(0)
	pos := 0
	for pos < n-1 {
		next := farthest[pos+1]
		score += int64(next-pos) * int64(nums[next])
		pos = next
	}
	return score
}
