// The max of |subarray sum| is realized at one of the two extremes:
// the max subarray sum or the negated min subarray sum. Track both
// running extremes in one sweep, each starting fresh whenever
// extending the run would only hurt it.
func maxAbsoluteSum(nums []int) int {
	best, worst, curMax, curMin := 0, 0, 0, 0
	for _, v := range nums {
		curMax = max(curMax+v, v)
		best = max(best, curMax)
		curMin = min(curMin+v, v)
		worst = min(worst, curMin)
	}
	return max(best, -worst)
}
