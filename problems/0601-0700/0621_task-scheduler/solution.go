func leastInterval(tasks []string, n int) int {
	counts := make(map[string]int)
	for _, t := range tasks {
		counts[t]++
	}
	maxFreq := 0
	numMax := 0
	for _, v := range counts {
		if v > maxFreq {
			maxFreq = v
			numMax = 1
		} else if v == maxFreq {
			// Letters tying the max each occupy one slot of the final partial run.
			numMax++
		}
	}
	// The bottleneck letter frames (maxFreq-1) cycles of n+1 plus the final
	// run; enough distinct tasks fill every gap, so never answer less than the
	// plain task count.
	formula := (maxFreq-1)*(n+1) + numMax
	if len(tasks) > formula {
		return len(tasks)
	}
	return formula
}
