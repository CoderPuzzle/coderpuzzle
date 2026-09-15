func hardestWorker(n int, logs [][]int) int {
	// The ith task runs from the previous leave time to logs[i][1] (task 0
	// starts at 0). Keep the best (longest, then smallest id) running.
	bestId := -1
	bestTime := -1
	prev := 0
	for _, log := range logs {
		duration := log[1] - prev
		if duration > bestTime || (duration == bestTime && log[0] < bestId) {
			bestTime = duration
			bestId = log[0]
		}
		prev = log[1]
	}
	return bestId
}
