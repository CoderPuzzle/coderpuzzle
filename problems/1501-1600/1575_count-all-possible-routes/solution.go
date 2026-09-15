const routesMod = 1_000_000_007

func countRoutes(locations []int, start int, finish int, fuel int) int {
	n := len(locations)
	memo := make([][]int64, n)
	for i := range memo {
		memo[i] = make([]int64, fuel+1)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}

	var routesFrom func(city, remaining int) int64
	routesFrom = func(city, remaining int) int64 {
		if memo[city][remaining] != -1 {
			return memo[city][remaining]
		}
		// A route may stop here (only valid when this city is the
		// destination) or continue on to any other city that still leaves
		// non-negative fuel; both possibilities are counted.
		var total int64
		if city == finish {
			total = 1
		}
		for neighbor := 0; neighbor < n; neighbor++ {
			if neighbor == city {
				continue
			}
			cost := locations[city] - locations[neighbor]
			if cost < 0 {
				cost = -cost
			}
			if cost <= remaining {
				total += routesFrom(neighbor, remaining-cost)
			}
		}
		total %= routesMod
		memo[city][remaining] = total
		return total
	}

	return int(routesFrom(start, fuel))
}
