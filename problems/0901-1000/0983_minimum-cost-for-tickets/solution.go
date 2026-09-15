func mincostTickets(days []int, costs []int) int {
	durations := []int{1, 7, 30}
	last := days[len(days)-1]
	travel := make([]bool, last+1)
	for _, d := range days {
		travel[d] = true
	}
	// dp[d]: cheapest coverage of every travel day up to d.
	dp := make([]int, last+31)
	for day := 1; day <= last; day++ {
		if !travel[day] {
			// No decision on non-travel days; the cost carries forward.
			dp[day] = dp[day-1]
		} else {
			// A pass of duration u ending today covers (day - u, day];
			// clamping at 0 treats dp[0] = 0 as "nothing before day 1".
			best := 1 << 30
			for i, dur := range durations {
				prev := day - dur
				if prev < 0 {
					prev = 0
				}
				if c := dp[prev] + costs[i]; c < best {
					best = c
				}
			}
			dp[day] = best
		}
	}
	return dp[last]
}
