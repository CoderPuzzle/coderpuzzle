import "sort"

func longestConsecutive(nums []int) int {
	// Sort in place: duplicates become neighbours and every maximal chain
	// becomes one contiguous run of +1 steps, so a single walk measures
	// them all.
	sort.Ints(nums)
	best := 0
	run := 0
	previous := 0
	for index, value := range nums {
		if index == 0 || value > previous+1 {
			// A gap of two or more (or the very first entry) starts a
			// fresh chain.
			run = 1
		} else if value == previous+1 {
			run++
		}
		// An equal value is a duplicate of one already counted: the run
		// keeps its length.
		previous = value
		if run > best {
			best = run
		}
	}
	// An empty array never enters the loop, so 0 falls out for free.
	return best
}
