import "sort"

// Overlap, if any, must sit between next-door meetings once the order is
// by start time, so sorting makes one linear pass enough.
func canAttendMeetings(intervals [][]int) bool {
	sort.Slice(intervals, func(a, b int) bool {
		return intervals[a][0] < intervals[b][0]
	})
	// A meeting ending exactly when the next begins is fine: the clash
	// test is strictly previous end > next start.
	for i := 1; i < len(intervals); i++ {
		if intervals[i-1][1] > intervals[i][0] {
			return false
		}
	}
	return true
}
