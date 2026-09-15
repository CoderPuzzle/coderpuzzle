import (
	"sort"
	"strconv"
)

// Only 24*60 distinct minute marks exist, so convert each "HH:MM" once and
// sort: the closest pair must be adjacent in sorted order.
func findMinDifference(timePoints []string) int {
	minutes := make([]int, len(timePoints))
	for index, time := range timePoints {
		hours, _ := strconv.Atoi(time[:2])
		mins, _ := strconv.Atoi(time[3:])
		minutes[index] = hours*60 + mins
	}
	sort.Ints(minutes)
	// The clock wraps, so the first and last marks are also a pair —
	// the one that spans midnight; its gap is first + 1440 - last.
	best := minutes[0] + 24*60 - minutes[len(minutes)-1]
	for index := 1; index < len(minutes); index++ {
		if gap := minutes[index] - minutes[index-1]; gap < best {
			best = gap
		}
	}
	return best
}
