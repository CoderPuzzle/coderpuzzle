func missingElement(nums []int, k int) int {
	n := len(nums)
	// A gapless array would have nums[i] = nums[0] + i, so missing(i) counts
	// the values absent before nums[i]; it is non-decreasing.
	missing := func(i int) int { return nums[i] - nums[0] - i }
	// Whole array holds fewer than k missing numbers: answer lies beyond the
	// last element.
	if missing(n-1) < k {
		return nums[n-1] + (k - missing(n-1))
	}
	// First index whose missing count reaches k; missing(0) = 0 < k keeps
	// lo >= 1, so lo - 1 is always valid.
	lo, hi := 0, n-1
	for lo < hi {
		mid := lo + (hi-lo)/2
		if missing(mid) >= k {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	// The kth missing number sits in the gap right after nums[lo-1].
	return nums[lo-1] + (k - missing(lo-1))
}
