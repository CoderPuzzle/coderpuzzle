func maximumScore(nums []int) int64 {
	n := len(nums)
	// The running prefix sum reaches n * 10^9 = 10^14, well past 32 bits,
	// so it accumulates in a 64-bit integer even though each element fits.
	p := int64(0)
	for _, value := range nums {
		p += int64(value)
	}
	// Sweep the split indices right to left carrying two running views:
	// p holds prefixSum(i) and suffixMin holds the minimum of
	// nums[i+1..n-1]. The last valid split seeds the answer.
	p -= int64(nums[n-1])
	suffixMin := nums[n-1]
	best := p - int64(suffixMin)
	for i := n - 3; i >= 0; i-- {
		// Moving to split i folds nums[i+1] into both views.
		if nums[i+1] < suffixMin {
			suffixMin = nums[i+1]
		}
		p -= int64(nums[i+1])
		if score := p - int64(suffixMin); score > best {
			best = score
		}
	}
	return best
}
