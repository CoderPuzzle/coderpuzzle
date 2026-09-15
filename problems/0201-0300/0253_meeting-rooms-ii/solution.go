import "sort"

func minMeetingRooms(intervals [][]int) int {
	if len(intervals) == 0 {
		return 0
	}
	starts := make([]int, len(intervals))
	ends := make([]int, len(intervals))
	for i, iv := range intervals {
		starts[i] = iv[0]
		ends[i] = iv[1]
	}
	sort.Ints(starts)
	sort.Ints(ends)
	// Equivalent sweep to the min-heap of end times: count meetings that
	// start before the earliest ongoing meeting has ended.
	rooms := 0
	j := 0
	for _, s := range starts {
		if s >= ends[j] {
			j++ // reuse the room freed earliest
		} else {
			rooms++
		}
	}
	return rooms
}
