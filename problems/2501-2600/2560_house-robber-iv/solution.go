func minCapability(nums []int, k int) int {
	lo, hi := nums[0], nums[0]
	for _, x := range nums {
		lo = min(lo, x)
		hi = max(hi, x)
	}
	// "k non-adjacent houses all <= cap" is monotone in cap, so binary search
	// the smallest feasible cap over the value range [min, max] — raw values,
	// so nums needs no sorting. Lower-mid since we minimize.
	for lo < hi {
		mid := lo + (hi-lo)/2
		if feasible(nums, mid, k) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}

func feasible(nums []int, cap int, k int) bool {
	// Greedy scan: take every house that fits under the cap and skip its
	// neighbor. Taking an eligible house is never worse than skipping it —
	// skipping forfeits a pick without unlocking a better one — so this
	// counts the maximum non-adjacent picks.
	count := 0
	i := 0
	for i < len(nums) {
		if nums[i] <= cap {
			count++
			i += 2
		} else {
			i++
		}
	}
	return count >= k
}
