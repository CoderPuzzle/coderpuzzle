// Pigeonhole buckets: the n-1 sorted gaps sum to the value span, so the
// maximum gap is at least ceil(span/(n-1)); buckets that wide can never hold
// the answer internally, and the jump between one bucket's max and the next
// non-empty bucket's min is all that needs measuring.
func maximumGap(nums []int) int {
	if len(nums) < 2 {
		// No pair of successive elements exists.
		return 0
	}
	lo, hi := nums[0], nums[0]
	for _, value := range nums {
		lo = min(lo, value)
		hi = max(hi, value)
	}
	if lo == hi {
		// Equal extremes mean every value is identical: all gaps are 0.
		return 0
	}
	count := len(nums) - 1
	width := (hi - lo + count - 1) / count
	bucketMin := make([]int, count+1)
	bucketMax := make([]int, count+1)
	used := make([]bool, count+1)
	for _, value := range nums {
		// Pure division into [lo, hi] — lo lands in bucket 0, hi in
		// bucket count at most, and no multiplication can overflow.
		index := (value - lo) / width
		if !used[index] || value < bucketMin[index] {
			bucketMin[index] = value
		}
		if !used[index] || value > bucketMax[index] {
			bucketMax[index] = value
		}
		used[index] = true
	}
	best := 0
	previousMax := bucketMax[0] // bucket 0 holds lo, so it is never empty
	for index := 1; index <= count; index++ {
		if !used[index] {
			// Empty bucket: the measured jump only grows wider, and
			// the neighbours are successive in sorted order.
			continue
		}
		best = max(best, bucketMin[index]-previousMax)
		previousMax = bucketMax[index]
	}
	return best
}
