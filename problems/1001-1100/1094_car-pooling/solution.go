func carPooling(trips [][]int, capacity int) bool {
	// difference array over the bounded locations: each trip is just
	// two events, +passengers at pickup and -passengers at dropoff
	diff := make([]int, 1001)
	for _, t := range trips {
		// dropoff lands at the exact end location, so during the sweep
		// it frees seats before any pickup at the same point
		diff[t[1]] += t[0]
		diff[t[2]] -= t[0]
	}
	// index order is the sweep: the running sum is the occupancy
	used := 0
	for _, delta := range diff {
		used += delta
		if used > capacity {
			return false
		}
	}
	return true
}
