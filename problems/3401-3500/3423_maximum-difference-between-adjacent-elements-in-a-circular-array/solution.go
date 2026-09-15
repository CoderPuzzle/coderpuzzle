func maxAdjacentDistance(nums []int) int {
	// One pass over the n circular edges: pair i with (i + 1) % n, so
	// the last iteration compares the last and first elements.
	ans := 0
	n := len(nums)
	for i := 0; i < n; i++ {
		d := nums[i] - nums[(i+1)%n]
		if d < 0 {
			d = -d
		}
		if d > ans {
			ans = d
		}
	}
	return ans
}
