func lastStoneWeightII(stones []int) int {
	// Smash order is irrelevant: the last stone is a signed sum, so the
	// task is a two-group partition minimizing the difference of sums.
	total := 0
	for _, s := range stones {
		total += s
	}
	// With group A + group B = total fixed, minimizing total - 2*sum(A)
	// means pushing sum(A) as close to total/2 as possible.
	target := total / 2
	reachable := make([]bool, target+1)
	reachable[0] = true
	for _, value := range stones {
		// Descend so a stone can't be counted twice in the same sum.
		for s := target; s >= value; s-- {
			if reachable[s-value] {
				reachable[s] = true
			}
		}
	}
	// Largest reachable subset sum at most target.
	best := 0
	for s := target; s >= 0; s-- {
		if reachable[s] {
			best = s
			break
		}
	}
	return total - 2*best
}
