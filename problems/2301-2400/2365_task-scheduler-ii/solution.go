func taskSchedulerII(tasks []int, space int) int64 {
	// Greedily complete each task on the earliest legal day: breaks only
	// ever help by making a later same-type task legal sooner. Jump the
	// clock to last[type] + space + 1 when the next task is still blocked;
	// totals reach ~1e10, so run in 64 bits.
	lastDay := make(map[int]int64)
	var day int64
	for _, task := range tasks {
		if last, exists := lastDay[task]; exists {
			next := last + int64(space) + 1
			if day+1 > next {
				next = day + 1
			}
			day = next
		} else {
			day++
		}
		lastDay[task] = day
	}
	return day
}
