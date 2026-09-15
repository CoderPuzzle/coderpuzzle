// One pass with a restart at the previous pair: track cur, the length of the
// alternating run ending at i. Its next delta must be +1 when cur is odd and
// -1 when cur is even.
func alternatingSubarray(nums []int) int {
	best, cur := -1, 1
	for i := 1; i < len(nums); i++ {
		need := 1
		if cur%2 != 1 {
			need = -1
		}
		delta := nums[i] - nums[i-1]
		switch {
		case delta == need:
			cur++
		case delta == 1:
			// A +1 pair is a fresh run starting at i-1: restart there, not
			// at i, or [2,3,4,3,4] loses its second half.
			cur = 2
		default:
			cur = 1
		}
		if cur > 1 && cur > best {
			best = cur
		}
	}
	return best
}
