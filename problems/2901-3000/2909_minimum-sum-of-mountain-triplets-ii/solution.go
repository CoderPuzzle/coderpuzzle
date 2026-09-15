// For a fixed peak j the best i is the smallest value left of j and the best
// k the smallest value right of j, so prefix and suffix minima settle both
// sides in one array each. Every interior index is tried as the peak; the
// strict inequalities guard against equal shoulders, and -1 survives when
// none qualifies.
func minimumSum(nums []int) int {
	n := len(nums)
	prefixMin := make([]int, n)
	prefixMin[0] = nums[0]
	for i := 1; i < n; i++ {
		prefixMin[i] = min(prefixMin[i-1], nums[i])
	}
	suffixMin := make([]int, n)
	suffixMin[n-1] = nums[n-1]
	for i := n - 2; i >= 0; i-- {
		suffixMin[i] = min(suffixMin[i+1], nums[i])
	}
	best := -1
	for j := 1; j+1 < n; j++ {
		left, right := prefixMin[j-1], suffixMin[j+1]
		if left < nums[j] && right < nums[j] {
			total := left + nums[j] + right
			if best == -1 || total < best {
				best = total
			}
		}
	}
	return best
}
