// A lone house has no distinct neighbor on either side, so robbing it is
// legal even though the "give up an end" sweeps below see nothing.
func rob(nums []int) int64 {
	if len(nums) == 1 {
		return int64(nums[0])
	}
	// The circle's only extra edge over the line joins the first and last
	// houses, so every legal plan gives up the first house or the last:
	// solve the linear street on nums[1:] and nums[:len-1], keep the better.
	return max(robLine(nums[1:]), robLine(nums[:len(nums)-1]))
}

// Rolling two-variable DP: cur is the best through house i-1, prev the best
// through i-2, so no DP table is ever allocated.
func robLine(houses []int) int64 {
	var prev, cur int64
	for _, money := range houses {
		prev, cur = cur, max(cur, prev+int64(money))
	}
	return cur
}
