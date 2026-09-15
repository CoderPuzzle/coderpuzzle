// The best mountain through a peak j pairs nums[j] with the smallest value
// on each side, so running minima from both ends bracket every candidate;
// both side values must sit strictly below the peak.
func minimumSum(nums []int) int {
	n := len(nums)
	leftMin := append([]int(nil), nums...)
	for i := 1; i < n; i++ {
		if leftMin[i-1] < leftMin[i] {
			leftMin[i] = leftMin[i-1]
		}
	}
	rightMin := append([]int(nil), nums...)
	for i := n - 2; i >= 0; i-- {
		if rightMin[i+1] < rightMin[i] {
			rightMin[i] = rightMin[i+1]
		}
	}
	best := -1
	for j := 1; j < n-1; j++ {
		lo, hi := leftMin[j-1], rightMin[j+1]
		if lo < nums[j] && hi < nums[j] {
			if total := lo + nums[j] + hi; best == -1 || total < best {
				best = total
			}
		}
	}
	return best
}
