import "sort"

func maxValue(events [][]int, k int) int64 {
	// Sorted by end day, any compatible set read by finish time is a
	// subsequence of this order, so earlier choices sit to the left.
	sort.Slice(events, func(a, b int) bool { return events[a][1] < events[b][1] })
	n := len(events)
	ends := make([]int, n)
	for i, e := range events {
		ends[i] = e[1]
	}
	// prev[i]: best value using the first i sorted events with one fewer
	// allowed attendance.
	prev := make([]int64, n+1)
	rounds := k
	if rounds > n {
		rounds = n
	}
	for j := 0; j < rounds; j++ {
		cur := make([]int64, n+1)
		best := int64(0)
		for i := 1; i <= n; i++ {
			// Events ending strictly before this start are exactly the
			// first p sorted events (strict: may not start the day another
			// ends).
			p := sort.SearchInts(ends, events[i-1][0])
			// The running max carries the skip option forward.
			if take := prev[p] + int64(events[i-1][2]); take > best {
				best = take
			}
			cur[i] = best
		}
		prev = cur
	}
	return prev[n]
}
