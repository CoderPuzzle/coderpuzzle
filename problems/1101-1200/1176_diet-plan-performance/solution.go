func dietPlanPerformance(calories []int, k int, lower int, upper int) int {
	points := 0
	// Sum the first window once; every later window shares k-1 days
	// with its predecessor.
	window := 0
	for i := 0; i < k; i++ {
		window += calories[i]
	}
	points += score(window, lower, upper)
	for i := k; i < len(calories); i++ {
		window += calories[i] - calories[i-k]
		points += score(window, lower, upper)
	}
	return points
}

func score(total, lower, upper int) int {
	if total < lower {
		return -1
	}
	if total > upper {
		return 1
	}
	return 0
}
