func maximumScore(nums []int, k int) int {
	n := len(nums)
	best := nums[k]
	// Every good subarray contains k, so grow [lo, hi] outward from
	// (k, k); each intermediate interval is itself a candidate.
	lo, hi := k, k
	curMin := nums[k]
	for lo > 0 || hi < n-1 {
		var cand int
		if lo == 0 {
			hi++
			cand = nums[hi]
		} else if hi == n-1 {
			lo--
			cand = nums[lo]
		} else if nums[lo-1] >= nums[hi+1] {
			// Take the larger boundary element: both sides end up absorbed
			// anyway, so deferring the smaller one keeps the running
			// minimum as high as possible at the current width.
			lo--
			cand = nums[lo]
		} else {
			hi++
			cand = nums[hi]
		}
		if cand < curMin {
			curMin = cand
		}
		// min x width; scoring every step covers every width 1..n.
		score := curMin * (hi - lo + 1)
		if score > best {
			best = score
		}
	}
	return best
}
