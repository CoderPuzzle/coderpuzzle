import "sort"

func minOperations(nums []int) int {
	// Each removal takes out one strictly increasing subsequence, so a
	// non-increasing chain (x >= y in order) must span distinct removals;
	// by Dilworth's theorem the answer is the longest non-increasing
	// subsequence length.
	tails := make([]int, 0, len(nums))
	for _, x := range nums {
		// Negate and search for the first pile top > v (bisect_right):
		// equal values extend the same pile, turning patience sorting's
		// "longest strictly increasing" into "longest non-increasing".
		v := -x
		pos := sort.Search(len(tails), func(i int) bool { return tails[i] > v })
		// The value opens a new pile (append) or replaces the leftmost
		// pile top it can sit on; piles stay sorted, and their count is
		// the answer.
		if pos == len(tails) {
			tails = append(tails, v)
		} else {
			tails[pos] = v
		}
	}
	return len(tails)
}
