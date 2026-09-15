import "sort"

func kIncreasing(arr []int, k int) int {
	longestNondecreasing := func(seq []int) int {
		// Patience trick: tails[l] is the smallest possible tail of a
		// non-decreasing subsequence of length l+1.
		tails := make([]int, 0, len(seq))
		for _, value := range seq {
			// Search for the first tail strictly greater than value — equal
			// elements extend the subsequence instead of replacing, which is
			// what makes it non-decreasing.
			pos := sort.Search(len(tails), func(i int) bool {
				return tails[i] > value
			})
			if pos == len(tails) {
				tails = append(tails, value)
			} else {
				tails[pos] = value
			}
		}
		return len(tails)
	}

	operations := 0
	// arr[i-k] <= arr[i] only relates indices congruent mod k, so each
	// residue class is an independent subsequence.
	for start := 0; start < k; start++ {
		sub := make([]int, 0, len(arr)/k+1)
		for i := start; i < len(arr); i += k {
			sub = append(sub, arr[i])
		}
		// Keep the LNDS unchanged and rewrite everything else; values are
		// free, so any kept subsequence can be completed.
		operations += len(sub) - longestNondecreasing(sub)
	}
	return operations
}
