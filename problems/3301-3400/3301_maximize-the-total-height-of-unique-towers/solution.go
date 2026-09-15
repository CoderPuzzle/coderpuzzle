import "sort"

func maximumTotalSum(maximumHeight []int) int64 {
	// Sorting descending makes the distinctness bound exact position by
	// position: once the previous tower took height prev, no later tower
	// may take anything above prev - 1, so each assigned height is
	// min(cap, prev - 1); falling below 1 means some prefix demands more
	// distinct positive integers than exist up to the largest cap, and no
	// rearrangement helps. Totals reach 10^14, so everything widens to int64.
	sort.Sort(sort.Reverse(sort.IntSlice(maximumHeight)))
	var total int64
	prev := int64(1 << 62)
	for _, cap := range maximumHeight {
		height := int64(cap)
		if prev-1 < height {
			height = prev - 1
		}
		if height < 1 {
			return -1
		}
		total += height
		prev = height
	}
	return total
}
