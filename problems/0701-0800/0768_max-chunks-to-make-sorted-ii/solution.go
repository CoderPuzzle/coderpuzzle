import "sort"

func maxChunksToSorted(arr []int) int {
	// A boundary is legal exactly when the multiset of arr's prefix
	// equals the sorted copy's prefix — values repeat, so multisets,
	// not max/min ranges, decide.
	ordered := make([]int, len(arr))
	copy(ordered, arr)
	sort.Ints(ordered)
	counts := map[int]int{}
	balance := 0
	chunks := 0
	for i := range arr {
		// Each update adds +1 when it leaves a count nonzero (a new
		// unpaired element) and -1 when it brings one back to zero.
		counts[arr[i]]++
		if counts[arr[i]] > 0 {
			balance++
		} else {
			balance--
		}
		counts[ordered[i]]--
		if counts[ordered[i]] < 0 {
			balance++
		} else {
			balance--
		}
		// Zero balance = no unpaired elements: the prefix multisets
		// agree, so cut a chunk at the earliest such index.
		if balance == 0 {
			chunks++
		}
	}
	return chunks
}
