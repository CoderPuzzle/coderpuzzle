import "sort"

func minimumTime(jobs []int, workers []int) int {
	// Pair the k-th smallest job with the k-th smallest worker. Exchange
	// argument: ceil(j / w) never decreases when j grows and never grows
	// when w does, so if a smaller job held the larger of two capacities
	// while a larger job held the smaller one, swapping them leaves both
	// pairs' day counts no higher and every other pair untouched. Each
	// swap removes an inversion between the sorted orders, so uncrossing
	// ends at this rank-by-rank pairing — its maximum is the optimum.
	sort.Ints(jobs)
	sort.Ints(workers)
	best := 0
	for i, job := range jobs {
		if days := (job + workers[i] - 1) / workers[i]; days > best {
			best = days
		}
	}
	return best
}
