import "sort"

func mostBooked(n int, meetings [][]int) int {
	ordered := make([][3]int, len(meetings))
	for i, m := range meetings {
		ordered[i] = [3]int{m[0], m[1], i}
	}
	sort.SliceStable(ordered, func(i, j int) bool {
		return ordered[i][0] < ordered[j][0]
	})
	// endTime[i] = when room i frees up (-1: never used, always free).
	endTime := make([]int64, n)
	for i := range endTime {
		endTime[i] = -1
	}
	count := make([]int, n)
	for _, m := range ordered {
		s, e := m[0], m[1]
		// Lowest-numbered room already free by s wins the allocation.
		room := -1
		for i := 0; i < n; i++ {
			if endTime[i] <= int64(s) {
				room = i
				break
			}
		}
		if room == -1 {
			// All busy: take the earliest-finishing room (strict < keeps
			// the lowest index on ties) and delay the meeting there with
			// its original duration.
			room = 0
			for i := 1; i < n; i++ {
				if endTime[i] < endTime[room] {
					room = i
				}
			}
			endTime[room] += int64(e - s)
		} else {
			endTime[room] = int64(e)
		}
		count[room]++
	}
	// Strict comparison keeps the lowest room index on count ties.
	best := 0
	for i := 1; i < n; i++ {
		if count[i] > count[best] {
			best = i
		}
	}
	return best
}
