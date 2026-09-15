func maxVacationDays(flights [][]int, days [][]int) int {
	n := len(flights)
	k := len(days[0])
	// dp[city] = best vacation total through the weeks handled so far;
	// -1 marks the cities no schedule has reached yet.
	dp := make([]int, n)
	for city := range dp {
		dp[city] = -1
	}
	// Before week 0 the traveler sits in city 0 with nothing banked, so
	// week 0's own step encodes the first Monday's flight.
	dp[0] = 0
	for w := 0; w < k; w++ {
		ndp := make([]int, n)
		for city := range ndp {
			ndp[city] = -1
		}
		for j := 0; j < n; j++ {
			for i := 0; i < n; i++ {
				if dp[i] < 0 {
					continue
				}
				// One decision per week: a Monday flight i -> j, or
				// staying put (i == j) at no flight cost.
				if i == j || flights[i][j] == 1 {
					if total := dp[i] + days[j][w]; total > ndp[j] {
						ndp[j] = total
					}
				}
			}
		}
		dp = ndp
	}
	// Staying in a city is always allowed, so the start city keeps some
	// schedule alive every week.
	best := dp[0]
	for _, total := range dp[1:] {
		if total > best {
			best = total
		}
	}
	return best
}
