import "sort"

func minAvailableDuration(slots1 [][]int64, slots2 [][]int64, duration int) []int64 {
	a := append([][]int64(nil), slots1...)
	b := append([][]int64(nil), slots2...)
	sort.Slice(a, func(x, y int) bool { return a[x][0] < a[y][0] })
	sort.Slice(b, func(x, y int) bool { return b[x][0] < b[y][0] })
	i, j := 0, 0
	for i < len(a) && j < len(b) {
		start := a[i][0]
		if b[j][0] > start {
			start = b[j][0]
		}
		end := a[i][1]
		if b[j][1] < end {
			end = b[j][1]
		}
		if end-start >= int64(duration) {
			return []int64{start, start + int64(duration)}
		}
		// The earlier-ending slot cannot overlap any later slot of the other
		// person, so only that pointer advances.
		if a[i][1] < b[j][1] {
			i++
		} else {
			j++
		}
	}
	return []int64{}
}
