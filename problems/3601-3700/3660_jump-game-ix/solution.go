func maxValue(nums []int) []int {
	n := len(nums)
	// suf[i]: smallest value in nums[i..n-1]; a sentinel past the end lets
	// the last index always close its segment.
	suf := make([]int, n+1)
	suf[n] = 1 << 62
	for i := n - 1; i >= 0; i-- {
		suf[i] = min(suf[i+1], nums[i])
	}
	// Grow the current segment while its prefix maximum strictly exceeds the
	// suffix minimum just past it: any such boundary is crossed by an
	// inverted pair, so the component cannot end there.
	ans := make([]int, 0, n)
	segMax, run := 0, 0
	for i, value := range nums {
		segMax = max(segMax, value)
		run++
		if i == n-1 || segMax <= suf[i+1] {
			// The segment is closed: every index inside it reaches the
			// segment maximum and nothing beyond it.
			for j := 0; j < run; j++ {
				ans = append(ans, segMax)
			}
			segMax, run = 0, 0
		}
	}
	return ans
}
