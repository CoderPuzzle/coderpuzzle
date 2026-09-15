import "math"

// Scan left to right carrying the running max: an element below the
// running max is out of place, and the LAST such index is the window's
// right edge; a right-to-left pass with the running min finds the left
// edge. Strict < and > keep equal values out.
func findUnsortedSubarray(nums []int) int {
	n := len(nums)
	start, end := -1, -1
	runningMax := math.MinInt
	for i := 0; i < n; i++ {
		if nums[i] < runningMax {
			end = i
		} else {
			runningMax = nums[i]
		}
	}
	runningMin := math.MaxInt
	for i := n - 1; i >= 0; i-- {
		if nums[i] > runningMin {
			start = i
		} else {
			runningMin = nums[i]
		}
	}
	if end == -1 {
		return 0
	}
	return end - start + 1
}
