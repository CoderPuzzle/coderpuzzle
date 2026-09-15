import "sort"

func minMoves2(nums []int) int {
	// Each move shifts one element by one unit, so gathering everything on
	// a target t costs exactly sum |x - t| — and a sum of absolute distances
	// is minimized at the median. Pairing the sorted values outermost-inward
	// shows why: a pair pays its full gap wherever its two elements meet, so
	// any pivot between the two middles is optimal, and the lower middle
	// element is as good as any.
	//
	// Each distance is up to 2*10^9 and there are up to 10^5 of them, so the
	// running total spans 2*10^14, but Go's int is 64-bit on every judge
	// platform, so the accumulation is exact.
	sort.Ints(nums)
	pivot := nums[(len(nums)-1)/2]
	total := 0
	for _, value := range nums {
		if value < pivot {
			total += pivot - value
		} else {
			total += value - pivot
		}
	}
	return total
}
