func minArraySum(nums []int, k int) int64 {
	// A block sums to a multiple of k exactly when its endpoint prefix
	// sums share a remainder mod k, and any deletion sequence collapses
	// to disjoint divisible-sum blocks of the original array.
	best := map[int]int64{0: 0}
	// dp: min surviving sum over the elements processed so far. Totals
	// reach 1e11, hence int64 throughout.
	var dp, prefix int64
	for _, value := range nums {
		// Keep this element...
		cand := dp + int64(value)
		prefix += int64(value)
		// ...or delete back to the nearest same-remainder prefix, which
		// leaves that prefix's surviving sum untouched.
		r := int(prefix % int64(k))
		if seen, ok := best[r]; ok && seen < cand {
			cand = seen
		}
		dp = cand
		// Insert after the lookup so the empty block never registers.
		if cur, ok := best[r]; !ok || dp < cur {
			best[r] = dp
		}
	}
	return dp
}
