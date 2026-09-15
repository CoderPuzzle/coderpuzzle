func canCompleteCircuit(gas []int, cost []int) int {
	total := int64(0)
	tank := int64(0)
	start := 0
	for i := range gas {
		diff := int64(gas[i]) - int64(cost[i])
		// total witnesses whether the whole circuit is feasible at all.
		total += diff
		// tank is the running surplus measured from the candidate start.
		tank += diff
		if tank < 0 {
			// Restarting anywhere in [start, i] forfeits a non-negative
			// surplus, so an intermediate start reaches i with even less
			// fuel: the whole stretch is disqualified in one stroke.
			start = i + 1
			tank = 0
		}
	}
	// total >= 0 certifies the final candidate can finish the circuit.
	if total >= 0 {
		return start
	}
	return -1
}
