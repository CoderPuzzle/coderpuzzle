import "sort"

func closestRoom(rooms [][]int, queries [][]int) []int {
	n := len(rooms)
	roomsBySize := make([]int, n)
	for i := range roomsBySize {
		roomsBySize[i] = i
	}
	sort.Slice(roomsBySize, func(a, b int) bool {
		return rooms[roomsBySize[a]][1] > rooms[roomsBySize[b]][1]
	})
	// Offline trick: process queries by decreasing minSize so rooms only accumulate.
	queryOrder := make([]int, len(queries))
	for j := range queryOrder {
		queryOrder[j] = j
	}
	sort.Slice(queryOrder, func(a, b int) bool {
		return queries[queryOrder[a]][1] > queries[queryOrder[b]][1]
	})
	ids := []int{} // kept sorted via insertion
	answers := make([]int, len(queries))
	ri := 0
	for _, j := range queryOrder {
		preferred := queries[j][0]
		minSize := queries[j][1]
		// Every room with size >= minSize qualifies; once inserted it stays
		// valid for all later queries (their thresholds are only smaller).
		for ri < n && rooms[roomsBySize[ri]][1] >= minSize {
			id := rooms[roomsBySize[ri]][0]
			pos := sort.SearchInts(ids, id)
			ids = append(ids, 0)
			copy(ids[pos+1:], ids[pos:])
			ids[pos] = id
			ri++
		}
		// Closest candidates sit just below/above the insertion point; best stays -1 when both miss.
		pos := sort.SearchInts(ids, preferred)
		best := -1
		bestDist := int64(1) << 62
		if pos > 0 {
			best = ids[pos-1]
			bestDist = int64(preferred - ids[pos-1])
		}
		// Strict < keeps floor (the smaller id) when the distances tie.
		if pos < len(ids) && int64(ids[pos]-preferred) < bestDist {
			best = ids[pos]
		}
		answers[j] = best // write via saved index: original order kept
	}
	return answers
}
