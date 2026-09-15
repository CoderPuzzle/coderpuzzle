func maximumScore(nums []int, multipliers []int) int {
	m := len(multipliers)
	n := len(nums)
	const negInf = -(1 << 60)
	// Base: after all m operations no score remains — stage m is all 0.
	prev := make([]int64, m+1)
	cur := make([]int64, m+1)
	// State (i, l) is complete: l taken from the left forces r = i - l
	// from the right, so the remaining ends are nums[l] and
	// nums[n-1-r]. Slots with l > i are unreachable and never read.
	for i := m - 1; i >= 0; i-- {
		for l := 0; l <= i; l++ {
			r := i - l
			// prev holds stage i + 1: taking the left moves to
			// (i+1, l+1), taking the right to (i+1, l).
			takeLeft := prev[l+1] + int64(multipliers[i])*int64(nums[l])
			takeRight := prev[l] + int64(multipliers[i])*int64(nums[n-1-r])
			if takeLeft >= takeRight {
				cur[l] = takeLeft
			} else {
				cur[l] = takeRight
			}
		}
		prev, cur = cur, prev
	}
	// State (0, 0): no operations used, nothing taken from the left.
	return int(prev[0])
}
