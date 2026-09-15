import "math"

func maxSubarraySum(nums []int, k int) int64 {
	n := len(nums)
	prefix := make([]int64, n+1)
	for i := 0; i < n; i++ {
		prefix[i+1] = prefix[i] + int64(nums[i])
	}
	// minPref[r]: smallest prefix sum seen at an index congruent to r
	// mod k. Length divisible by k means both endpoints share a residue,
	// so within each class maximize prefix[i] minus the earlier minimum.
	minPref := make([]int64, k)
	for r := range minPref {
		minPref[r] = math.MaxInt64
	}
	// MinInt64 start, not 0: an all-negative array still has a best.
	best := int64(math.MinInt64)
	for i := 0; i <= n; i++ {
		r := i % k
		// Compare before updating the bucket, so the paired prefix is
		// strictly earlier and the subarray stays non-empty.
		if minPref[r] != math.MaxInt64 {
			cand := prefix[i] - minPref[r]
			if cand > best {
				best = cand
			}
		}
		if prefix[i] < minPref[r] {
			minPref[r] = prefix[i]
		}
	}
	return best
}
