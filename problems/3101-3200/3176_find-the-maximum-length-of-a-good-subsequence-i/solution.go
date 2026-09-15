func maximumLength(nums []int, k int) int {
	// One row per change budget: row[v][a] is the longest good
	// subsequence using exactly a changes and ending on value v;
	// endsAll[a] mirrors the best over all endings. Same-valued tails
	// extend for free, everything else spends one budget step, and both
	// reads use stats frozen before this element.
	ends := map[int][]int{}
	endsAll := make([]int, k+1)
	best := 0
	for _, x := range nums {
		row := ends[x]
		if row == nil {
			row = make([]int, k+1)
			ends[x] = row
		}
		computed := make([]int, k+1)
		for a := 0; a <= k; a++ {
			prior := 0
			if a > 0 {
				prior = endsAll[a-1]
			}
			computed[a] = max(row[a], prior) + 1
		}
		for a := 0; a <= k; a++ {
			if computed[a] > row[a] {
				row[a] = computed[a]
			}
			if computed[a] > endsAll[a] {
				endsAll[a] = computed[a]
			}
			best = max(best, endsAll[a])
		}
	}
	return best
}
