// Only the largest project can block the schedule: every milestone of the
// other projects acts as a separator letting one extra milestone of the
// largest project be placed without adjacency. If rest (all other
// milestones) is at least mx - 1, every milestone is schedulable (total
// weeks); otherwise the best is rest separator-and-large pairs plus one
// final large milestone, i.e. 2*rest + 1 weeks.
func numberOfWeeks(milestones []int) int64 {
	var total int64
	mx := 0
	for _, m := range milestones {
		total += int64(m)
		if m > mx {
			mx = m
		}
	}
	rest := total - int64(mx)
	paired := 2*rest + 1
	if paired < total {
		return paired
	}
	return total
}
