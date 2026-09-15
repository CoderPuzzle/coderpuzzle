// Difference array over years: +1 at birth, -1 at death; a prefix sweep
// reconstructs each year's population.
func maximumPopulation(logs [][]int) int {
	delta := make([]int, 2052)
	for _, log := range logs {
		delta[log[0]]++
		delta[log[1]]--
	}
	bestYear, bestPop, cur := 1950, -1, 0
	for year := 1950; year <= 2050; year++ {
		cur += delta[year]
		if cur > bestPop {
			bestPop = cur
			bestYear = year
		}
	}
	return bestYear
}
