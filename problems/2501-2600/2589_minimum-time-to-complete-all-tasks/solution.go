import "sort"

// Run each task as late as its window allows: seconds committed at the
// end of the timeline are inside more upcoming (by end time) windows, so
// this never steals a second an earlier task needed.
func findMinimumTime(tasks [][]int) int {
	sort.Slice(tasks, func(i, j int) bool { return tasks[i][1] < tasks[j][1] })
	running := make([]bool, 2001)
	total := 0
	for _, task := range tasks {
		start, end := task[0], task[1]
		// Reuse whatever is already on inside this window...
		need := task[2]
		for t := start; t <= end; t++ {
			if running[t] {
				need--
			}
		}
		// ...then book the remainder at the latest free points.
		for t := end; need > 0; t-- {
			if !running[t] {
				running[t] = true
				total++
				need--
			}
		}
	}
	return total
}
