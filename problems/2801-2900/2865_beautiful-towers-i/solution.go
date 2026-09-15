// best[i] = heaviest sum of a non-decreasing ramp ending at i with tower i
// kept at full height; one stack sweep per direction gives every peak
// candidate in O(n) total.
func maximumSumOfHeights(heights []int) int64 {
	reversed := make([]int, len(heights))
	for i, h := range heights {
		reversed[len(heights)-1-i] = h
	}
	left := rampSums(heights)
	right := rampSums(reversed)
	for i, j := 0, len(right)-1; i < j; i, j = i+1, j-1 {
		right[i], right[j] = right[j], right[i] // back to original indices
	}
	var best int64
	for i := range heights {
		// Tower i sits in both ramps when it is the peak, so its own
		// height is counted once per direction and must be subtracted.
		best = max(best, left[i]+right[i]-int64(heights[i]))
	}
	return best
}

// A stack of (height, width) runs holds the clamped prefix; popping taller
// runs re-stamps those towers at the current, lower height in one multiply
// instead of touching them one by one.
func rampSums(nums []int) []int64 {
	best := make([]int64, len(nums))
	type run struct {
		height, width int64
	}
	var runs []run // strictly rising heights
	var total int64
	for i, h := range nums {
		width := int64(1)
		for len(runs) > 0 && runs[len(runs)-1].height >= int64(h) {
			top := runs[len(runs)-1]
			total -= top.height * top.width
			width += top.width
			runs = runs[:len(runs)-1]
		}
		total += int64(h) * width
		runs = append(runs, run{int64(h), width})
		best[i] = total
	}
	return best
}
