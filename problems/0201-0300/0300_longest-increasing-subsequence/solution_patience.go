import "sort"

func lengthOfLIS(nums []int) int {
	// tails[k] = smallest value ending an increasing subsequence of
	// length k+1; it stays sorted, which licenses the binary search.
	tails := []int{}
	for _, x := range nums {
		// SearchInts finds the first tail >= x: an equal value
		// overwrites its own tail, enforcing strict increase.
		i := sort.SearchInts(tails, x)
		if i == len(tails) {
			// Bigger than every tail: x extends the best subsequence.
			tails = append(tails, x)
		} else {
			// Same length, cheaper ending — more room to extend later.
			tails[i] = x
		}
	}
	// tails itself need not be a real subsequence; only its length is.
	return len(tails)
}
