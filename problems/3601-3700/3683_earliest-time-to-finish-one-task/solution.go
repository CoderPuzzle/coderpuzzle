// Tasks never interact: [s, t] finishes at s + t, so the earliest
// completion is just the smallest such sum.
func earliestTime(tasks [][]int) int {
	best := tasks[0][0] + tasks[0][1]
	for _, task := range tasks[1:] {
		if sum := task[0] + task[1]; sum < best {
			best = sum
		}
	}
	return best
}
