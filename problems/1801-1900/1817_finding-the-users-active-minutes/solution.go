// A user's UAM is the size of the set of minutes they acted in, so one pass
// grouping logs into per-user minute sets is all the counting needed; each
// user then lands in exactly one answer bucket.
func findingUsersActiveMinutes(logs [][]int, k int) []int {
	minutesByUser := make(map[int]map[int]bool)
	for _, log := range logs {
		minutes, ok := minutesByUser[log[0]]
		if !ok {
			minutes = make(map[int]bool)
			minutesByUser[log[0]] = minutes
		}
		minutes[log[1]] = true
	}
	answer := make([]int, k)
	for _, minutes := range minutesByUser {
		// k covers every user's UAM by the constraints; the guard only
		// keeps a malformed k from writing out of range.
		if len(minutes) <= k {
			answer[len(minutes)-1]++
		}
	}
	return answer
}
