// Try both relative orders: firstLen before secondLen, and secondLen
// before firstLen. Skipping either one silently misses inputs where the
// better placement runs the other way.
func maxSumTwoNoOverlap(nums []int, firstLen int, secondLen int) int {
	n := len(nums)
	prefix := make([]int, n+1)
	for i, value := range nums {
		prefix[i+1] = prefix[i] + value
	}

	best := func(lead int, trail int) int {
		// Sweep every position where the trailing window could end,
		// tracking the best leading window that ends at or before the
		// trailing window's start (so the two never overlap, whether they
		// touch or leave a gap between them).
		maxLead := 0
		result := 0
		for end := lead + trail; end <= n; end++ {
			leadSum := prefix[end-trail] - prefix[end-trail-lead]
			if leadSum > maxLead {
				maxLead = leadSum
			}
			trailSum := prefix[end] - prefix[end-trail]
			if maxLead+trailSum > result {
				result = maxLead + trailSum
			}
		}
		return result
	}

	a := best(firstLen, secondLen)
	b := best(secondLen, firstLen)
	if a > b {
		return a
	}
	return b
}
