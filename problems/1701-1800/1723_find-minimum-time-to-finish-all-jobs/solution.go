import "sort"

func minimumTimeRequired(jobs []int, k int) int {
	sortedJobs := make([]int, len(jobs))
	copy(sortedJobs, jobs)
	// Biggest jobs first: the largest loads surface at the shallowest
	// levels, where the bound tightens soonest.
	sort.Sort(sort.Reverse(sort.IntSlice(sortedJobs)))
	n := len(sortedJobs)
	// Pessimistic upper bound: everything on one worker.
	best := 0
	for _, j := range sortedJobs {
		best += j
	}
	loads := make([]int64, k)

	var dfs func(i int)
	dfs = func(i int) {
		if i == n {
			// Every complete assignment is legal; keep its max load.
			current := int64(0)
			for _, l := range loads {
				if l > current {
					current = l
				}
			}
			if current < int64(best) {
				best = int(current)
			}
			return
		}
		seen := make(map[int64]bool)
		for w := 0; w < k; w++ {
			// A worker whose current load was already tried for this job
			// leads to an identical subproblem.
			if seen[loads[w]] {
				continue
			}
			seen[loads[w]] = true
			// Bound: this placement can no longer beat best.
			if loads[w]+int64(sortedJobs[i]) >= int64(best) {
				continue
			}
			loads[w] += int64(sortedJobs[i])
			dfs(i + 1)
			loads[w] -= int64(sortedJobs[i])
			// Empty workers are interchangeable — one trial suffices.
			if loads[w] == 0 {
				break
			}
		}
	}

	dfs(0)
	return best
}
