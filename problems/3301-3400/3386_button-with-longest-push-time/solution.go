// Press i takes time_i - time_{i-1} (its own time_i for the first press).
// Keep the best press seen so far, replacing it on a strictly longer time,
// or on an equal time from a smaller button index — the statement's tie
// rule.
func buttonWithLongestTime(events [][]int) int {
	bestIndex := events[0][0]
	bestTaken := events[0][1]
	for i := 1; i < len(events); i++ {
		index := events[i][0]
		taken := events[i][1] - events[i-1][1]
		if taken > bestTaken || (taken == bestTaken && index < bestIndex) {
			bestIndex = index
			bestTaken = taken
		}
	}
	return bestIndex
}
