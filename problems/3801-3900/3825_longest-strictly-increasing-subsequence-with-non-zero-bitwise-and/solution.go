import "sort"

func longestSubsequence(nums []int) int {
	// A subsequence ANDs to something non-zero exactly when all of its
	// elements share at least one set bit, so for each bit keep the
	// elements that have it (order preserved) and take the longest
	// strictly increasing subsequence among them; the best bit wins.
	top := 0
	for _, x := range nums {
		if x > top {
			top = x
		}
	}
	best := 0
	for b := 0; top>>b > 0; b++ {
		var tails []int
		for _, x := range nums {
			if x>>b&1 == 0 {
				continue
			}
			// Strictly increasing: replace the first tail >= x.
			i := sort.SearchInts(tails, x)
			if i == len(tails) {
				tails = append(tails, x)
			} else {
				tails[i] = x
			}
		}
		if len(tails) > best {
			best = len(tails)
		}
	}
	return best
}
