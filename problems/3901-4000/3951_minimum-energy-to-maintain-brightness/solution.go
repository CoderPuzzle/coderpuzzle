import "sort"

func minEnergy(n int, brightness int, intervals [][]int) int64 {
	bulbs := int64((brightness + 2) / 3)
	sort.Slice(intervals, func(i, j int) bool {
		return intervals[i][0] < intervals[j][0]
	})
	merged := [][]int{}
	for _, interval := range intervals {
		if len(merged) > 0 && interval[0] <= merged[len(merged)-1][1]+1 {
			if interval[1] > merged[len(merged)-1][1] {
				merged[len(merged)-1][1] = interval[1]
			}
		} else {
			merged = append(merged, []int{interval[0], interval[1]})
		}
	}
	var activeTime int64
	for _, interval := range merged {
		activeTime += int64(interval[1] - interval[0] + 1)
	}
	return bulbs * activeTime
}
