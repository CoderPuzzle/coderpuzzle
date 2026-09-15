import "sort"

func maximumStrongPairXor(nums []int) int {
	// Sorting makes the kindred condition one-sided: a partner y of the
	// larger member x must satisfy x <= 2*y, so each x's partners are a
	// window over the earlier sorted values that two pointers maintain.
	sort.Ints(nums)
	// counts[level] maps a window value's first (level + 1) bits to how
	// many window values carry that prefix; every value is below 128, so
	// seven bits cover them all, and a value leaving the window just
	// decrements its counts instead of invalidating shared prefixes.
	counts := make([]map[int]int, 7)
	for level := range counts {
		counts[level] = make(map[int]int)
	}
	lo, best := 0, 0
	for i := 0; i < len(nums); i++ {
		x := nums[i]
		for 2*nums[lo] < x {
			y := nums[lo]
			prefix := 0
			for level := 0; level < 7; level++ {
				prefix = prefix*2 + ((y >> (6 - level)) & 1)
				counts[level][prefix]--
				if counts[level][prefix] == 0 {
					delete(counts[level], prefix)
				}
			}
			lo++
		}
		// Greedy walk over x's bits, high to low: keep a bit exactly when
		// the partner prefix that completes it is itself in the window.
		prefix, ans := 0, 0
		for level := 0; level < 7; level++ {
			prefix = prefix*2 + ((x >> (6 - level)) & 1)
			if _, ok := counts[level][prefix^(ans*2+1)]; ok {
				ans = ans*2 + 1
			} else {
				ans = ans * 2
			}
		}
		best = max(best, ans)
		// Admit x for the larger values still to come.
		prefix = 0
		for level := 0; level < 7; level++ {
			prefix = prefix*2 + ((x >> (6 - level)) & 1)
			counts[level][prefix]++
		}
	}
	return best
}
