func numOfMinutes(n int, headID int, manager []int, informTime []int) int {
	// arrival[i] = minutes until employee i starts spreading the news.
	arrival := make([]int, n)
	for i := range arrival {
		arrival[i] = -1
	}
	arrival[headID] = 0
	best := 0
	for employee := 0; employee < n; employee++ {
		if arrival[employee] >= 0 {
			if arrival[employee] > best {
				best = arrival[employee]
			}
			continue
		}
		// Walk up the chain of unresolved managers, then unwind downward.
		chain := []int{}
		current := employee
		for arrival[current] < 0 {
			chain = append(chain, current)
			current = manager[current]
		}
		for k := len(chain) - 1; k >= 0; k-- {
			boss := manager[chain[k]]
			arrival[chain[k]] = arrival[boss] + informTime[boss]
		}
		if arrival[employee] > best {
			best = arrival[employee]
		}
	}
	return best
}
