func maximumTripletValue(nums []int) int64 {
	// One pass with two running prefix maxima: while treating the current
	// element as k, bestDiff already holds the largest nums[i] - nums[j]
	// over i < j before it, so extending that best pair by nums[k] covers
	// every triplet ending here without ever re-scanning the prefix.
	// The answer is bounded by (10^6 - 1) * 10^6, which is why it rides
	// in an int64.
	var best int64     // all-negative answers collapse to 0
	var bestDiff int64 // max nums[i] - nums[j] over pairs passed
	var maxPrefix int64
	for _, x := range nums {
		v := int64(x)
		if d := bestDiff * v; d > best {
			best = d
		}
		if d := maxPrefix - v; d > bestDiff {
			bestDiff = d
		}
		if v > maxPrefix {
			maxPrefix = v
		}
	}
	return best
}
