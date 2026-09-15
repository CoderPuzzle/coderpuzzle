func maximumRemovals(s string, p string, removable []int) int {
	// Classic greedy subsequence scan: skipping removed positions, match each
	// character of p at the earliest opportunity (optimal for containment).
	stillSubsequence := func(k int) bool {
		removed := make([]bool, len(s))
		for i := 0; i < k; i++ {
			removed[removable[i]] = true
		}
		pi := 0
		for i := 0; i < len(s) && pi < len(p); i++ {
			if !removed[i] && s[i] == p[pi] {
				pi++
			}
		}
		return pi == len(p)
	}

	// Feasibility is monotone (fewer deletions only restore characters), so the
	// workable k form an interval starting at 0 — binary search its right end.
	lo, hi := 0, len(removable)
	for lo < hi {
		// Upper-mid form keeps the search converging toward the largest feasible k.
		mid := (lo + hi + 1) / 2
		if stillSubsequence(mid) {
			lo = mid
		} else {
			hi = mid - 1
		}
	}
	return lo
}
