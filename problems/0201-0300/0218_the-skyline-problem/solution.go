import "sort"

func getSkyline(buildings [][]int) [][]int {
	// events: [x, kind, key, right]; key = -height for start, +height for end
	events := make([][4]int, 0, len(buildings)*2)
	for _, b := range buildings {
		events = append(events, [4]int{b[0], 0, -b[2], b[1]})
		events = append(events, [4]int{b[1], 1, b[2], b[1]})
	}
	// The 4-tuple ordering encodes the tie-breaking: starts (kind 0) before
	// ends (kind 1) at equal x so adjacent buildings hand off without a dip
	// to ground; taller starts first (-height); shorter ends first so a tall
	// building survives until its own right edge.
	sort.Slice(events, func(i, j int) bool {
		for k := 0; k < 4; k++ {
			if events[i][k] != events[j][k] {
				return events[i][k] < events[j][k]
			}
		}
		return false
	})

	// max-heap of (height, right) with lazy removal; sentinel ground level
	heap := [][2]int{{0, 1 << 62}}
	push := func(item [2]int) {
		heap = append(heap, item)
		i := len(heap) - 1
		for i > 0 {
			p := (i - 1) / 2
			if heap[p][0] >= heap[i][0] {
				break
			}
			heap[p], heap[i] = heap[i], heap[p]
			i = p
		}
	}
	pop := func() {
		last := len(heap) - 1
		heap[0] = heap[last]
		heap = heap[:last]
		i := 0
		for {
			l, r, m := 2*i+1, 2*i+2, i
			if l < len(heap) && heap[l][0] > heap[m][0] {
				m = l
			}
			if r < len(heap) && heap[r][0] > heap[m][0] {
				m = r
			}
			if m == i {
				break
			}
			heap[m], heap[i] = heap[i], heap[m]
			i = m
		}
	}

	result := [][]int{}
	previousHeight := 0
	for _, ev := range events {
		x, kind, key, right := ev[0], ev[1], ev[2], ev[3]
		// Lazy removal: pop top entries whose building has ended; stale
		// entries below the top are harmless until they surface.
		for len(heap) > 0 && heap[0][1] <= x {
			pop()
		}
		if kind == 0 {
			push([2]int{-key, right})
		}
		currentHeight := heap[0][0]
		// Emit a key point only when the contour height actually changes,
		// which also merges consecutive equal-height segments.
		if currentHeight != previousHeight {
			result = append(result, []int{x, currentHeight})
			previousHeight = currentHeight
		}
	}
	return result
}
