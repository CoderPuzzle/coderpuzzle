import (
	"sort"
)

func countDays(days int, meetings [][]int) int {
	sort.Slice(meetings, func(i, j int) bool {
		return meetings[i][0] < meetings[j][0]
	})
	free := 0
	lastEnd := 0
	for _, meeting := range meetings {
		start, end := meeting[0], meeting[1]
		if start > lastEnd {
			free += start - lastEnd - 1
		}
		if end > lastEnd {
			lastEnd = end
		}
	}
	free += days - lastEnd
	return free
}
