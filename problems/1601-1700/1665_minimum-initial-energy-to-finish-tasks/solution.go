import "sort"

func minimumEffort(tasks [][]int) int64 {
	// Order by slack (minimum - actual) descending: a high-slack task done
	// early banks its surplus while the budget is still high — exchange
	// arguments show an adjacent inversion never helps.
	sorted := make([][]int, len(tasks))
	copy(sorted, tasks)
	sort.Slice(sorted, func(a, b int) bool {
		return sorted[b][1]-sorted[b][0] < sorted[a][1]-sorted[a][0]
	})
	spent := int64(0)
	answer := int64(0)
	for _, task := range sorted {
		// Each task needs current energy >= its minimum, so the answer is
		// the largest prefix requirement; only `actual` is consumed.
		if spent+int64(task[1]) > answer {
			answer = spent + int64(task[1])
		}
		spent += int64(task[0])
	}
	return answer
}
