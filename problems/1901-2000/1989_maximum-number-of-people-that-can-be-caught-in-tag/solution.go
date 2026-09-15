func catchMaximumAmountofPeople(team []int, dist int) int {
	// Two-pointer greedy over the sorted "it" and "not it" positions: each
	// "it" catches the leftmost uncaught person within its reach.
	it := []int{}
	notIt := []int{}
	for i, v := range team {
		if v == 1 {
			it = append(it, i)
		} else {
			notIt = append(notIt, i)
		}
	}
	i, j, caught := 0, 0, 0
	for i < len(it) && j < len(notIt) {
		switch {
		case notIt[j] < it[i]-dist:
			// Too far left: every later "it" is further right, so this
			// person can never be caught; skip them.
			j++
		case notIt[j] > it[i]+dist:
			// Too far right for this "it": it can catch no one, move on.
			i++
		default:
			caught++
			i++
			j++
		}
	}
	return caught
}
