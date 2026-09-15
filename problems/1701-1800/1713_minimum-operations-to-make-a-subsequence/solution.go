func minOperations(target []int, arr []int) int {
	// Answer = len(target) - LCS: each target element not kept costs one
	// insertion. target has distinct values, so rewriting arr as target
	// indices turns the LCS into a longest strictly increasing run.
	index := make(map[int]int, len(target))
	for i, v := range target {
		index[v] = i
	}
	// Patience sorting: tails[k] = smallest tail of an increasing
	// subsequence of length k+1; the lower-bound search keeps it strictly
	// increasing (duplicate arr values map to one index and replace).
	tails := make([]int, 0, len(arr))
	for _, value := range arr {
		// Absent values never join a common subsequence and may stay.
		v, ok := index[value]
		if !ok {
			continue
		}
		lo, hi := 0, len(tails)
		for lo < hi {
			mid := int(uint(lo+hi) >> 1)
			if tails[mid] < v {
				lo = mid + 1
			} else {
				hi = mid
			}
		}
		if lo == len(tails) {
			tails = append(tails, v)
		} else {
			tails[lo] = v
		}
	}
	return len(target) - len(tails)
}
