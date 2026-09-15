import "sort"

func splitPainting(segments [][]int) [][]int64 {
	// Difference events per segment: +color at its start, -color at its end.
	// The mixed sum is piecewise constant and can only change at these
	// coordinates.
	diff := make(map[int64]int64)
	for _, seg := range segments {
		diff[int64(seg[0])] += int64(seg[2])
		diff[int64(seg[1])] -= int64(seg[2])
	}
	keys := make([]int64, 0, len(diff))
	for k := range diff {
		keys = append(keys, k)
	}
	sort.Slice(keys, func(a, b int) bool { return keys[a] < keys[b] })
	result := [][]int64{}
	running := int64(0)
	for i := 0; i < len(keys)-1; i++ {
		// Between consecutive event coordinates the active set is fixed, so
		// running is the mixed color on that open interval. Colors are
		// distinct, so each event genuinely changes the sum -- emitting at
		// every coordinate is minimal, not merely correct.
		running += diff[keys[i]]
		if running > 0 { // skip unpainted gaps where nothing is active
			result = append(result, []int64{keys[i], keys[i+1], running})
		}
	}
	return result
}
