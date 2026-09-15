func maxFreeTime(eventTime int, k int, startTime []int, endTime []int) int {
	// A meeting that stays put pins its position, so one continuous free
	// block can only stretch across gaps whose separating meetings are all
	// rescheduled — at most k of them, hence at most k + 1 consecutive gaps.
	// Compacting any k consecutive meetings against one edge of their span
	// realizes that window's gap sum as a single block.
	n := len(startTime)
	gaps := make([]int, n+1)
	gaps[0] = startTime[0]
	for i := 1; i < n; i++ {
		gaps[i] = startTime[i] - endTime[i-1]
	}
	gaps[n] = eventTime - endTime[n-1]
	// Rolling sum of the k + 1 gaps around each group of k meetings.
	window := 0
	for i := 0; i <= k; i++ {
		window += gaps[i]
	}
	best := window
	for i := k + 1; i <= n; i++ {
		window += gaps[i] - gaps[i-k-1]
		if window > best {
			best = window
		}
	}
	return best
}
