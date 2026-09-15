func minNumberOfSemesters(n int, relations [][]int, k int) int {
	// prereq[i] = bitmask of courses that must precede course i.
	prereq := make([]int, n)
	for _, relation := range relations {
		prereq[relation[1]-1] |= 1 << (relation[0] - 1)
	}
	full := 1<<n - 1
	// dp[mask] = min semesters to have taken exactly the courses in mask.
	// Every transition only adds bits, so the target mask is numerically
	// larger — increasing order finalizes every predecessor first.
	// The n+1 sentinel parks unreachable states.
	unreachable := n + 1
	dp := make([]int, full+1)
	for state := range dp {
		dp[state] = unreachable
	}
	dp[0] = 0

	relax := func(state, candidate int) {
		if candidate < dp[state] {
			dp[state] = candidate
		}
	}
	// Enumerate every exactly-need-sized subset of bits[start..] by recursion.
	var choose func(bits []int, start, need, taken, steps int)
	choose = func(bits []int, start, need, taken, steps int) {
		if need == 0 {
			relax(taken, steps+1)
			return
		}
		for i := start; i+need <= len(bits); i++ {
			choose(bits, i+1, need-1, taken|(1<<bits[i]), steps)
		}
	}

	for mask := 0; mask < full; mask++ {
		if dp[mask] == unreachable {
			continue
		}
		// Available = untaken courses whose prerequisite set already sits
		// inside mask (one AND per course).
		avail := 0
		for course := 0; course < n; course++ {
			if mask>>course&1 == 0 && prereq[course]&^mask == 0 {
				avail |= 1 << course
			}
		}
		if avail == 0 {
			continue
		}
		bits := make([]int, 0, n)
		for course := 0; course < n; course++ {
			if avail>>course&1 == 1 {
				bits = append(bits, course)
			}
		}
		// Fewer than k available: take them all in a single semester.
		if len(bits) <= k {
			relax(mask|avail, dp[mask]+1)
		} else {
			// Taking an extra available course never hurts, so only
			// semesters that take exactly k courses need examining.
			choose(bits, 0, k, mask, dp[mask])
		}
	}
	return dp[full]
}
