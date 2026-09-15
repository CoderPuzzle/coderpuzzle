// All k doublings belong on one element: the OR's top bit comes from a
// single element, and giving that element every operation only pushes its
// bits higher, so split plans are never better. The boosted element
// reaches 10^9 * 2^15 < 2^45, past int32 range, so it widens to int64
// before shifting.
func maximumOr(nums []int, k int) int64 {
	n := len(nums)
	// suffix[i] = OR of nums[i:], so the OR of every element except i is
	// prefix | suffix in O(1) while i sweeps left to right.
	suffix := make([]int64, n+1)
	for i := n - 1; i >= 0; i-- {
		suffix[i] = suffix[i+1] | int64(nums[i])
	}
	var best int64
	var prefix int64
	for i := 0; i < n; i++ {
		// The full OR with nums[i] << k swapped in for nums[i].
		candidate := prefix | (int64(nums[i]) << k) | suffix[i+1]
		if candidate > best {
			best = candidate
		}
		prefix |= int64(nums[i])
	}
	return best
}
