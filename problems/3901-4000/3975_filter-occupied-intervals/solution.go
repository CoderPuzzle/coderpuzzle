import "sort"

func filterOccupiedIntervals(occupiedIntervals [][]int, freeStart int, freeEnd int) [][]int {
	sort.Slice(occupiedIntervals, func(i, j int) bool {
		return occupiedIntervals[i][0] < occupiedIntervals[j][0]
	})
	merged := [][]int{}
	for _, interval := range occupiedIntervals {
		if len(merged) > 0 && interval[0] <= merged[len(merged)-1][1]+1 {
			if interval[1] > merged[len(merged)-1][1] {
				merged[len(merged)-1][1] = interval[1]
			}
		} else {
			merged = append(merged, []int{interval[0], interval[1]})
		}
	}

	answer := [][]int{}
	for _, interval := range merged {
		start, end := interval[0], interval[1]
		if freeEnd < start || freeStart > end {
			answer = append(answer, []int{start, end})
			continue
		}
		if freeStart > start {
			answer = append(answer, []int{start, freeStart - 1})
		}
		if freeEnd < end {
			answer = append(answer, []int{freeEnd + 1, end})
		}
	}
	return answer
}
